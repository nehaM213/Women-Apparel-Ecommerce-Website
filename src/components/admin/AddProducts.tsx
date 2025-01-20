"use client";

import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectGroup,
  SelectContent,
  SelectValue,
  SelectTrigger,
  SelectLabel,
} from "../ui/select";
import { Collection } from "mongoose";
import { MultiSelectDropdown } from "../common/MultiSelectDropdown";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }),
  product_slug: z
    .string()
    .min(1, { message: "Product slug is required." })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: "Product slug must be in lowercase and can include hyphens.",
    }),
  price: z.string().min(1, { message: "Price is required." }), // Could be a string to handle different price formats
  category: z.string().min(1, { message: "Category name is required." }),
  quantity: z
    .number()
    .min(1, { message: "Quantity is required." })
    .min(0, { message: "Quantity must be a non-negative number." }),
  description: z.string().optional(),
  collections: z
    .array(z.string())
    .min(1, { message: "Please add atleast one collection." }), // Assuming category is a string here
  product_images: z
    .array(z.string())
    .min(1, { message: "Please add atleast one product image." }), // Assuming URLs or paths as strings
  material: z.string().optional(),
  wash_care: z.string().optional(),
  date_created: z.date().default(new Date()).optional(),
  date_modified: z.date().default(new Date()).optional(),
  total_sales: z
    .number()
    .min(0, { message: "Total sales must be a non-negative number." })
    .optional(),
});

const categoryOptions = [
  {
    name: "Saree",
    slug: "saree",
    collection: [
      "cotton saree",
      "silk saree",
      "banarasi saree",
      "georgette saree",
    ],
  },
  { name: "Suit", slug: "suit", collection: ["cotton suit", "silk suit"] },
  {
    name: "Stole & Dupatta",
    slug: "stole-and-dupatta",
    collection: ["chanderi", "georgette"],
  },
  { name: "Shawl", slug: "shawl", collection: ["pasmina"] },
];

export function AddProducts() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      product_slug: "",
      price: "",
      quantity: 0,
      description: "",
      category: "",
      collections: [],
      product_images: [],
      material: "",
      wash_care: "",
      date_created: new Date(),
      date_modified: new Date(),
      total_sales: 0,
    },
  });

  const [images, setImages] = useState<File[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [availableCollections, setAvailableCollections] = useState<string[]>(
    []
  );

  const options = [
    { id: 1, label: "Option 1" },
    { id: 2, label: "Option 2" },
    { id: 3, label: "Option 3" },
    { id: 4, label: "Option 4" },
  ];

  const handleSelectedOptions = (selectedIds: (number | string)[]) => {
    console.log("Selected options:", selectedIds); // Perform any action with selected option IDs
  };
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);

  const handleAddImages = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImages([...images, ...Array.from(event.target.files)]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[\s-]+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  };

  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.title) {
        const newSlug = generateSlug(value.title);
        if (newSlug !== value.product_slug) {
          form.setValue("product_slug", newSlug);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const handleCategoryChange = (value: string) => {
    const selectedSlug = value;
    setSelectedCategory(selectedSlug);

    const selectedCategoryObj = categoryOptions.find(
      (option) => option.slug === selectedSlug
    );
    if (selectedCategoryObj) {
      setAvailableCollections(selectedCategoryObj.collection || []);
      form.setValue("collections", []); // Reset collection when category changes
    } else {
      setAvailableCollections([]);
    }
  };

  const handleCollectionToggle = (value: string) => {
    setSelectedCollections((prev) => {
      if (prev.includes(value)) {
        // Remove the value if it's already selected
        return prev.filter((item) => item !== value);
      } else {
        // Add the value if it's not selected
        return [...prev, value];
      }
    });
  };

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Convert the form values to a more readable format
    const formData = {
      ...values,
      date_created: values.date_created?.toISOString(),
      date_modified: values.date_modified?.toISOString(),
    };
    console.log("Form submitted with values:", formData);
  }
  // ...

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Product title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="product_slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Slug</FormLabel>
                <FormControl>
                  <Input placeholder="product-slug" {...field} readOnly />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      handleCategoryChange(value);
                    }}
                    value={field.value}
                  >
                    <SelectTrigger variant="form">
                      <SelectValue placeholder="Select a Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {categoryOptions.map((option) => (
                          <SelectItem key={option.slug} value={option.slug}>
                            {option.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="collections"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Collections</FormLabel>
                <FormControl>
                  <Select
                    value=""
                  >
                    <SelectTrigger variant="form">
                      <SelectValue placeholder="Select Collections" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {availableCollections.map((option, index) => (
                          <SelectItem key={index} value={option} onClick={() => handleCollectionToggle(option)}>
                            <span className={selectedCollections.includes(option) ? 'font-bold' : ''}>
                              {option}
                            </span>
                            {selectedCollections.includes(option) && <span> ✔️</span>} 
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
                <div className="mt-2">
                  {selectedCollections.map((collection, index) => (
                    <span key={index} className="inline-flex items-center px-2 py-1 text-sm font-medium text-white bg-blue-500 rounded-full mr-2">
                      {collection}
                      <button
                        type="button"
                        className="ml-1 text-white"
                        onClick={() => {
                          const newSelected = selectedCollections.filter((item) => item !== collection);
                          setSelectedCollections(newSelected);
                          form.setValue('collections', newSelected);
                        }}
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              </FormItem>
            )}
          />
              <MultiSelectDropdown
        options={options}
        selected={handleSelectedOptions}
        placeholder="Select Collections"
        width="w-full" // Customize width (optional)
      />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder="Product price" {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Product quantity"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Product description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="material"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Material</FormLabel>
                <FormControl>
                  <Input placeholder="Material used" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="wash_care"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Wash Care</FormLabel>
                <FormControl>
                  <Input placeholder="Wash care instructions" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="product_images"
            render={() => (
              <FormItem>
                <FormLabel>Product Images</FormLabel>
                <FormControl>
                  <Input type="file" multiple onChange={handleAddImages} />
                </FormControl>
                <div className="mt-2">
                  {images.map((image, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={image.name}
                        className="w-16 h-16 object-cover"
                      />
                      <span>{image.name}</span>
                      <Button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                      >
                        Delete
                      </Button>
                    </div>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit">Add Product</Button>
      </form>
    </Form>
  );
}
