import { Message } from "@hugeicons/core-free-icons";
import { NextRequest, NextResponse } from "next/server";

export async function GET (req:NextRequest){

    const response =await fetch('https://ecommerce.routemisr.com/api/v1/brands');
    const payload =await response.json();

    return NextResponse.json(payload);

}