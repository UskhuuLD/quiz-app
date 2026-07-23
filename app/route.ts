import { NextResponse } from "next/server";
import {pool} from "@/lib/db"


export const GET = async () => {
    const result = await pool.query("SELECT * FROM employees")
    return NextResponse.json(
        {message: "user amjilttai butsaala",result},
        {status:200}
    )
}
export const POST = async(request:Request) => {
    const body = await request.json()
    const { fullName, age , gender, department, salary, years_of_service} = body
    const result = await pool.query(
        `INSERT INTO employees (fullName, age , gender, department, salary, years_of_service) VALUES()
                ${fullName}, ${age}, ${gender} , ${department}, ${salary}, ${years_of_service}
            )`
        )

        NextResponse.json({
            message:"amjilttai ajiltan uusgelee",
        })
}