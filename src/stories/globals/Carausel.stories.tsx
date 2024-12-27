import ImageCarousel from "@/components/globals/ImageCarousel";
import { Button } from "@/components/ui/button";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Globals/Carausel",
  component: ImageCarousel,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ImageCarousel>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    images: [
      {
        guid: "/productImages/car1.jpg",
      },
      {
        guid: "/productImages/car2.jpg",
      },
      {
        guid: "/productImages/car3.avif",
      },
    ],
  },
  argTypes: {
    images: {
      control: {
        type: "object",
      },
    },
  },
  render: ({ images }) => (
    <ImageCarousel images={images} />
  ),
};