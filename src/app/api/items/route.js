import { NextResponse } from "next/server";
import { query } from "../../../lib/db";

export async function GET(req, res) {
  let message;
  try {
    const items = await query({
      querry: "SELECT * FROM items WHERE isenable = 1",
      values: [],
    });

    if (items.find) {
      message = "success";
    } else {
      message = "error";
    }

    return NextResponse.json(
      { items: items },
      { status: 200 },
      { message: message }
    );
  } catch (error) {
    console.error("Error in Post :", error);
    return NextResponse.json(
      { status: 500 }, 
      { message: error }
    );
  }
}

export async function POST(req, res) {
  let message;
  const { itemname, itemcode } = await req.json();
  try {
    const newProducts = await query({
      querry: "INSERT INTO items (itemname, itemcode) VALUES (?,?)",
      values: [itemname,itemcode]
    });

    // const newItems = await query({
    //   querry: "CALL newItem(?, ?)",
    //   values: [itemname, itemcode],
    // });

    if (newItems.insertId) {
      message = "success";
    } else {
      message = "error";
    }

    const items = {
      itemname: itemname,
      itemcode: itemcode,
    };

    return NextResponse.json(
      { items: items }, 
      { message: message }
    );
  } catch (error) {
    console.error("Error in Post :", error);
    return NextResponse.json({ message: message });
  }
}

export async function PUT(req, res) {
  let message;
  const { id } = await req.json();
  try {
    
    const deleteItems = query({
      // querry: "DELETE FROM items WHERE id = ?",
      querry: "UPDATE items SET isenable = 0 WHERE id = ? ",
      values: [id],
    });

    if (deleteItems.finally) {
      message = "success";
    } else {
      message = "error";
    }

    return NextResponse.json(
      { items: id }, 
      { message: message }
    );
  } catch (error) {
    console.error("Error in Post :", error);
    return NextResponse.json({ message: message });
  }
}
