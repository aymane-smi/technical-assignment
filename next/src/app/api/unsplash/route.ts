import { NextRequest, NextResponse } from "next/server";
import Unsplash, { createApi } from "unsplash-js";

export async function GET(request:NextRequest){
    const user = createApi({accessKey: process.env.ACCESS_KEY as string});
    const offset:number = Number.parseInt(request.nextUrl.searchParams.get("offset") as string);
    const result:any = await user.photos.list({page: offset, perPage:10});
    return NextResponse.json(result.response.results);
    //return NextResponse.json({hello: "hello"});
}