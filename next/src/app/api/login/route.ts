import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
interface CredientelsRequest{
  username:string,
  password:string
}

type Loginresponse = {
  token: string
}
   
export async function POST(request:NextRequest) {
  const body = await request.json();
  const {username, password} = body;
  let result:number = loginValidator(username, password);
  switch(result){
    case 1:
      return costumeResponse(1, jwt.sign({username}, process.env.JWT_SECRET as string, {
        expiresIn: "10h"
      }), 200);
    case 2:
      return costumeResponse(2, "Ce compte a été bloqué", 403);
    case 3:
      return costumeResponse(2, "compte ou mot de passe et invalide", 404);
  }
}

export function loginValidator(username:string, password: string):number{
  if(username == "muser1" && password == "mpassword1")
    return 1;
  else if(username == "muser2" && password == "mpassword2")
    return 1;
  else if(username == "muser3" && password == "mpassword3")
    return 2;
  else
    return 3;
}

export function costumeResponse(type:number, message: string, status: number): NextResponse{
  return type == 1 ? NextResponse.json({
    token: message
  }, {
    status
  }) : NextResponse.json({
    message
  }, {
    status
  });
}