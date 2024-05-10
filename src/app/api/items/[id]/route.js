import { NextResponse } from "next/server";
import query from "../../../../lib/db";

export async function PUT(req,{params}, res) {
    let message;
    const {id } = params;
    const { itemcode,itemname } = await req.json();
    
    try{
        const updateItems = query({
            querry:"UPDATE items SET itemcode = ?, itemname = ? WHERE id = ?",
            values:[itemcode,itemname,id]
        })

        if(updateItems.finally){
            message= "success"
        }else{
            message= "error"
        }

        const items = {
            id:id,
            itemcode:itemcode,
            itemname:itemname
        }
        
        return NextResponse.json(
            {items:items},
            {message:message}
        )
    }catch (error) {
          console.error("Error in Post :", error);
          return NextResponse.json({ message: message });
        }
  }
  