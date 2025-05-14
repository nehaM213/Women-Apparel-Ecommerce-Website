"use client";

import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

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
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Dialog, DialogOverlay, DialogContent } from "@/components/ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { useEdgeStore } from "@/lib/edgestore";
import { FileState, MultiImageDropzone } from "../edgestore/multi-image-dropzone";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }),
  product_slug: z
    .string()
    .min(1, { message: "Product slug is required." })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: "Product slug must be in lowercase and can include hyphens.",
    }),
  price: z.string().min(1, { message: "Price is required." }),
  category: z.string().min(1, { message: "Category name is required." }),
  quantity: z
    .number()
    .min(1, { message: "Quantity is required." })
    .min(0, { message: "Quantity must be a non-negative number." }),
  description: z.string().optional(),
  collections: z.string().min(1, { message: "Collection is required." }),
  product_images: z
    .array(z.string())
    .min(1, { message: "Please add atleast one product image." }),
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
      collections: "",
      product_images: [],
      material: "",
      wash_care: "",
      date_created: new Date(),
      date_modified: new Date(),
      total_sales: 0,
    },
  });

  const [images, setImages] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [availableCollections, setAvailableCollections] = useState<string[]>(
    []
  );
  const [selectedCollections, setSelectedCollections] = useState<string>("");
  const [zoomedImage, setZoomedImage] = useState<File | null>(null);
  const { edgestore } = useEdgeStore();

  const [fileStates, setFileStates] = useState<FileState[]>([]);
  // const { edgestore } = useEdgeStore();
  function updateFileProgress(key: string, progress: FileState['progress']) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key,
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }

  const handleAddImages =async  (newFiles: File[]) => {
    const newImageNames = newFiles.map((file) => file.name);
    setImages((prevImages) => [...prevImages, ...newImageNames]);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    await Promise.all(
      newFiles.map(async (addedFileState) => {
        try {
          const res = await edgestore.publicImages.upload({
            file: addedFileState,
            onProgressChange: (progress) => {
              // you can use this to show a progress bar
              console.log(progress);
            },
          });
          console.log(res);
        } catch (err) {
          console.log("file upload error");
        }
      }),
    )
    
  };

  const handleRemoveImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleZoomImage = (image: File) => {
    console.log(image);
    setZoomedImage(image);
  };

  const handleCloseZoom = () => {
    setZoomedImage(null);
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
      setAvailableCollections(selectedCategoryObj.collection || "");
      form.setValue("collections", "");
    } else {
      setAvailableCollections([]);
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = {
      ...values,
      product_images:images,
      date_created: values.date_created?.toISOString(),
      date_modified: values.date_modified?.toISOString(),
    };
    console.log("Form submitted with values:", formData);
  }

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
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                  >
                    <SelectTrigger variant="form">
                      <SelectValue placeholder="Select Collections" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {availableCollections.map((option, index) => (
                          <SelectItem key={index} value={option}>
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
              </FormItem>
            )}
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
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value ? Number(value) : 0); // Convert to number or set to 0 if empty
                    }}
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
                <Textarea {...field} placeholder="Enter wash care instructions" />
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
                  <Textarea {...field} placeholder="Enter wash care instructions" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="product_images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Images</FormLabel>
                <FormControl>
                  <input
                    type="file"
                    multiple
                    onChange={(event) => {
                      if (event.target.files) {
                        const filesArray = Array.from(event.target.files);
                        handleAddImages(filesArray);
                      }
                    }}
                    accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
                <MultiImageDropzone
        value={fileStates}
        dropzoneOptions={{
          maxFiles: 6,
        }}
        onChange={(files) => {
          setFileStates(files);
        }}
        onFilesAdded={async (addedFiles) => {
          // Assuming you have these values in your component's state
          const productSlug = form.getValues("product_slug"); // Get product_slug from form
          const category = form.getValues("category"); // Get category from form
          const collection = form.getValues("collections"); // Get collection from form

          setFileStates([...fileStates, ...addedFiles]);

          await Promise.all(
            addedFiles.map(async (addedFileState) => {
              try {
                if (typeof addedFileState.file === 'string') {
                  throw new Error('File type is string, expected File');
                }

                // Generate a unique file name
                const originalFileName = addedFileState.file.name; // Get the original file name
                const fileExtension = originalFileName.split('.').pop(); // Get the file extension
                const uniqueFileName = `${productSlug}_${category}_${collection}.${fileExtension}`; // Construct the new file name

                const res = await edgestore.publicImages.upload({
                  file: addedFileState.file,
                  // fileName: uniqueFileName, // Pass the unique file name
                  onProgressChange: async (progress) => {
                    updateFileProgress(addedFileState.key, progress);
                    if (progress === 100) {
                      await new Promise((resolve) => setTimeout(resolve, 1000));
                      updateFileProgress(addedFileState.key, 'COMPLETE');
                    }
                  },
                });
                console.log(res);
              } catch (err) {
                updateFileProgress(addedFileState.key, 'ERROR');
              }
            }),
          );
        }}
      />
        </div>

              <div
                className="mt-4"
              >
                {images.map((image, index) => (
                      <div
                        key={image}
                        className="flex items-center space-x-2 cursor-move mb-3"
                      >
                        {(files[index].type.startsWith("image/")) ? (
                        <img
                          src={URL.createObjectURL(files[index])}
                          alt={image}
                          className="w-16 h-16 object-cover"
                          onClick={() => handleZoomImage(files[index])}
                        />
                        ) :
                        (
                          <video className="w-16 h-16 object-cover" src={URL.createObjectURL(files[index])} autoPlay loop muted onClick={() => handleZoomImage(files[index])} />
                        )}
                        <span>{image}</span>
                        <Button type="button" onClick={() => handleRemoveImage(index)}>
                          Remove
                        </Button>
                      </div>
                    ))}
              </div>

        {zoomedImage && (
          <Dialog open={!!zoomedImage} onOpenChange={handleCloseZoom}>
            <DialogOverlay className="fixed inset-0 bg-slate-600 bg-opacity-20" />
            <DialogContent className="fixed bg-white p-4 rounded max-h-[90vh] overflow-auto" >
            <DialogTitle>
      <VisuallyHidden>Zoomed Image</VisuallyHidden> 
    </DialogTitle>
    <DialogDescription>
      <VisuallyHidden>This dialog displays a zoomed image or video.</VisuallyHidden>
    </DialogDescription>
            {(zoomedImage.type.startsWith("image/")) ? (
              <img
                src={URL.createObjectURL(zoomedImage)}
                alt={zoomedImage.name}
                className="max-w-full max-h-full"
                onClick={handleCloseZoom}
              />
            ):
            ( 
              <video className="max-w-full max-h-full" src={URL.createObjectURL(zoomedImage)} autoPlay loop muted onClick={handleCloseZoom} />
            )}
            </DialogContent>
          </Dialog>
        )}

        <Button type="submit">Add Product</Button>
      </form>
    </Form>
  );
}
