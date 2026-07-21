import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addressSchema } from "@/schemas/addressSchema";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type AddressFormData = z.infer<typeof addressSchema>;

const AddAddressModal = ({ open, onClose, onAddAddress, initialData }: any) => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } =
    useForm<AddressFormData>({
      resolver: zodResolver(addressSchema),
      defaultValues: initialData || {},
    });

  useEffect(() => {
    if (initialData) reset(initialData);
    else reset({});
  }, [initialData, open, reset]);

  const onSubmit = (data: AddressFormData) => {
    onAddAddress(data);
  };

  return (
    <Dialog open={open} onOpenChange={(state) => !state && onClose()}>
      <DialogContent className="max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Address" : "Add Address"}</DialogTitle>
          <DialogDescription>
            Fields marked with <span className="text-red-500">*</span> are required.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* First Name */}
          <div className="space-y-1">
            <Label>First Name *</Label>
            <Input {...register("firstName")} placeholder="First Name" />
            {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName.message}</p>}
          </div>

          {/* Last Name */}
          <div className="space-y-1">
            <Label>Last Name *</Label>
            <Input {...register("lastName")} placeholder="Last Name" />
            {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName.message}</p>}
          </div>

          {/* Address Line 1 */}
          <div className="space-y-1">
            <Label>Address Line 1 *</Label>
            <Input {...register("addressLine1")} placeholder="House no., Street" />
            {errors.addressLine1 && <p className="text-red-500 text-xs">{errors.addressLine1.message}</p>}
          </div>

          {/* Address Line 2 */}
          <div className="space-y-1">
            <Label>Address Line 2</Label>
            <Input {...register("addressLine2")} placeholder="Landmark" />
          </div>

          {/* City & Country */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label>City *</Label>
              <Input {...register("city")} placeholder="City" />
              {errors.city && <p className="text-red-500 text-xs">{errors.city.message}</p>}
            </div>

            <div className="space-y-1">
              <Label>Country *</Label>
              <Input {...register("country")} placeholder="Country" />
              {errors.country && <p className="text-red-500 text-xs">{errors.country.message}</p>}
            </div>
          </div>

          {/* Postal & Contact */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label>Postal Code *</Label>
              <Input {...register("postalCode")} placeholder="110001" />
              {errors.postalCode && <p className="text-red-500 text-xs">{errors.postalCode.message}</p>}
            </div>

            <div className="space-y-1">
              <Label>Contact Number *</Label>
              <Input {...register("contactNumber")} placeholder="9876543210" />
              {errors.contactNumber && <p className="text-red-500 text-xs">{errors.contactNumber.message}</p>}
            </div>
          </div>

          {/* Default Checkbox */}
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" {...register("default")} />
            Set as default address
          </label>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting}>
              {initialData ? "Update" : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAddressModal;
