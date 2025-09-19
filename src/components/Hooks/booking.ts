import { useMemo } from "react";

interface BookingItem {
  booking_id: number;
  id: number;
  item: {
    item_image: string;
    item_name: string;
    price: string; // API gives string, we'll convert to number
  };
  item_id: number;
  quantity: number;
}

interface Booking {
  booked_at: string;
  booked_by: string;
  status: string;
  table_no: number;
  reserved_from: string; // full datetime string
  reserved_to: string;
  id: number;
    user: {
    image: string;
    name: string;
  };
  items: BookingItem[];
}

export const useBookingData = (bookings: Booking[]) => {
  const refinedData = useMemo(() => {
    return bookings.map((b) => {
      // total price
      const payablePrice = b.items.reduce((total, i) => {
        const priceNum = Number(i.item.price);
        return total + priceNum * i.quantity;
      }, 0);

      // extract time (HH:MM) from reserved_from & reserved_to
      const reservedFrom = b.reserved_from
        ? new Date(b.reserved_from).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        : "";

      const reservedTo = b.reserved_to
        ? new Date(b.reserved_to).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        : "";


      const bookedAt = b.booked_at
        ? new Date(b.booked_at).toLocaleDateString()
        : "";
      const reservedDate=new Date(b.reserved_from).toLocaleDateString();  

      return {
        id: b.id,
        bookedBy: b.booked_by,
        bookedAt,
        status:b.status,
        table:b.table_no,
        reservedFrom,
        reservedDate,
        userName:b.user.name,
        userImage:b.user.image,
        reservedTo,
        payablePrice,
        items: b.items.map((i) => ({
          ...i,
          item: {
            ...i.item,
            price: Number(i.item.price),
          },
        })),
      };
    });
  }, [bookings]);

  return refinedData;
};


