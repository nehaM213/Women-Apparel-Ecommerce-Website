import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type Address = {
  firstName?: string;
  lastName?: string;
  addressLine1?: string;
  addressLine2?: string;
  company?: string;
  postalCode?: string;
  contactNumber?: string;
  city?: string;
  country?: string;
  default?: boolean;
  _id?: string;
};

type AddAddressModalProps = {
  open: boolean;
  onClose: () => void;
  onAddAddress: (address: Address) => void;
  initialData?: Address;
};

const initialAddress: Address = {
  firstName: "",
  lastName: "",
  addressLine1: "",
  addressLine2: "",
  company: "",
  postalCode: "",
  contactNumber: "",
  city: "",
  country: "",
  default: false,
};

const AddAddressModal: React.FC<AddAddressModalProps> = ({
  open,
  onClose,
  onAddAddress,
  initialData,
}) => {
  const [formState, setFormState] = useState<Address>(initialAddress);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialData && open) {
      setFormState(initialData);
    } else if (open) {
      setFormState(initialAddress);
    }
  }, [initialData, open]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    let fieldValue: string | boolean = value;
    if (type === "checkbox") {
      fieldValue = (e.target as HTMLInputElement).checked;
    }
    setFormState((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    onAddAddress(formState);
    setSubmitting(false);
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose(); }}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Address' : 'Add New Address'}</DialogTitle>
          <DialogDescription>
            Please provide your delivery details. Fields marked with * are required.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formState.firstName}
                onChange={handleChange}
                placeholder="First Name"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formState.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="addressLine1">Address Line 1 *</Label>
            <Input
              id="addressLine1"
              name="addressLine1"
              value={formState.addressLine1}
              onChange={handleChange}
              placeholder="House no., Street, Area"
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="addressLine2">Address Line 2</Label>
            <Input
              id="addressLine2"
              name="addressLine2"
              value={formState.addressLine2}
              onChange={handleChange}
              placeholder="Landmark, Building, etc."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                name="city"
                value={formState.city}
                onChange={handleChange}
                placeholder="City"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="country">Country *</Label>
              <Input
                id="country"
                name="country"
                value={formState.country}
                onChange={handleChange}
                placeholder="Country"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="postalCode">Postal/Zip Code *</Label>
              <Input
                id="postalCode"
                name="postalCode"
                value={formState.postalCode}
                onChange={handleChange}
                placeholder="e.g., 110001"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="contactNumber">Contact Number *</Label>
              <Input
                id="contactNumber"
                name="contactNumber"
                value={formState.contactNumber}
                onChange={handleChange}
                placeholder="e.g., +91 9876543210"
                required
              />
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="default"
              checked={!!formState.default}
              onChange={handleChange}
            />
            Set as default address
          </label>

          <div className="flex gap-2 justify-end pt-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={submitting}>{initialData ? 'Update' : 'Save'}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAddressModal;
