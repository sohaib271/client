import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {api,useLoading,SpinnerContainer} from "./exporter/exporter"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {DollarSign, FileText, UtensilsCrossed } from "lucide-react"

interface ItemFormData {
  item_name: string
  description: string
  price: number
  item_image: FileList
}

export default function AddItemForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ItemFormData>();
  const {startLoading,stopLoading}=useLoading();
  const [upload,setItemUpload] = useState("");

  const onSubmit = async (data: ItemFormData) => {
    const formData = new FormData();
    formData.append("item_name", data.item_name);
    formData.append("description", data.description);
    formData.append("price", data.price.toString());
    if (data.item_image && data.item_image.length > 0) {
      formData.append("item_image", data.item_image[0]);
    }
    startLoading();
    const item=await api.post("/item/upload",formData);
    setItemUpload(item.data.success);
    reset();
    if(!item.data.success) setItemUpload(item.data.msg); stopLoading();
    stopLoading();
  }

  return (
    <>
    <SpinnerContainer/>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex justify-center items-center min-h-screen bg-[#1C1C1C] p-6"
    >
      <Card className="w-full max-w-md bg-[#2A2A2A] text-white shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-[#FFD700] flex items-center justify-center gap-2">
            <UtensilsCrossed size={24} /> Add New Item
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-[#FFD700]">{upload}</p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Item Name */}
            <div>
              <label className="block mb-1 text-sm font-semibold">Item Name</label>
              <div className="relative">
                <Input
                  placeholder="Enter item name"
                  className="pl-10 bg-[#1C1C1C] border border-gray-600 focus:border-[#FFD700]"
                  {...register("item_name", { required: "Item name is required" })}
                />
                <FileText className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>
              {errors.item_name && <p className="text-red-500 text-xs mt-1">{errors.item_name.message}</p>}
            </div>
            <div>
              <label className="block mb-1 text-sm font-semibold">Description</label>
              <Textarea
                placeholder="Enter description"
                className="bg-[#1C1C1C] border border-gray-600 focus:border-[#FFD700]"
                {...register("description", { required: "Description is required" })}
              />
              {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
            </div>

            {/* Price */}
            <div>
              <label className="block mb-1 text-sm font-semibold">Price</label>
              <div className="relative">
                <Input
                  type="number"
                  placeholder="Enter price"
                  className="pl-10 bg-[#1C1C1C] border border-gray-600 focus:border-[#FFD700]"
                  {...register("price", { required: "Price is required", valueAsNumber: true })}
                />
                <DollarSign className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>
              {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
            </div>

            {/* Image Upload */}
            <div>
              <label className="block mb-1 text-sm font-semibold">Item Image</label>
              <div className="relative">
                <Input
                  type="file"
                  accept="image/*"
                  className="bg-[#1C1C1C] border border-gray-600 focus:border-[#FFD700] file:bg-[#FFD700] file:text-black file:font-semibold file:rounded-lg file:px-3 file:py-1"
                  {...register("item_image", { required: "Image is required" })}
                />
              </div>
              {errors.item_image && <p className="text-red-500 text-xs mt-1">{errors.item_image.message}</p>}
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                type="submit"
                className="w-full bg-[#FFD700] text-black font-semibold hover:bg-[#e6c200] rounded-lg py-2"
              >
                Add Item
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
      </>
  )
}
