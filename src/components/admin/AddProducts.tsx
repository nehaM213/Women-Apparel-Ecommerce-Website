"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectItem, SelectGroup, SelectContent, SelectValue, SelectTrigger } from "../ui/select"

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }),
  product_slug: z.string().min(1, { message: "Product slug is required." }).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { 
    message: "Product slug must be in lowercase and can include hyphens."
  }),
  price: z.string().optional(), // Could be a string to handle different price formats
  quantity: z.number().min(0, { message: "Quantity must be a non-negative number." }).optional(),
  description: z.string().optional(),
  categories: z.array(z.string()).optional(), // Assuming category is a string here
  product_images: z.array(z.string()).optional(), // Assuming URLs or paths as strings
  material: z.string().optional(),
  wash_care: z.string().optional(),
  date_created: z.date().default(new Date()).optional(),
  date_modified: z.date().default(new Date()).optional(),
  total_sales: z.number().min(0, { message: "Total sales must be a non-negative number." }).optional(),
});

export function AddProducts() {

      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          title: "",
          product_slug: "",
          price: "",
          quantity: 0,
          description: "",
          categories: [], 
          product_images: [],
          material: "",
          wash_care: "",
          date_created: new Date(),
          date_modified: new Date(),
          total_sales: 0,
        },
      })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Convert the form values to a more readable format
    const formData = {
      ...values,
      date_created: values.date_created?.toISOString(),
      date_modified: values.date_modified?.toISOString()
    }
    console.log('Form submitted with values:', formData)
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
                <Input placeholder="product-slug" {...field} />
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
                <Input type="number" placeholder="Product quantity" {...field} />
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
        {/* <FormItem className="flex flex-col gap-0 space-x-0">
          <FormLabel>Select Subject</FormLabel>
          <FormControl>
            <Select
              onValueChange={(value) => {
                const productSubject = subject.find(
                  (item: { subject: string; }) => item.subject === value
                );
                if (productSubject) {
                  setProductImageBg(productSubject);
                }
              }}
              value={productImageBg.subject}
            >
              <SelectTrigger variant="form">
                <SelectValue placeholder="Select Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {subject?.map((item, index) => (
                    <SelectItem
                      value={item?.subject || ""}
                      key={item?.id || index}
                    >
                      <span className={`bg-${item.color} p-2`}></span>
                      {item.subject}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem> */}
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
        </div>
        <Button type="submit">Add Product</Button>
      </form>
    </Form>
  )
}
