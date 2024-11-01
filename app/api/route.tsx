import { connectDB } from "@/lib/config/db";
import TodoModel from "@/lib/models/TodoModel";
import { NextResponse, NextRequest } from "next/server";

const LoadDB = async () => {
  await connectDB();
};

LoadDB();

export async function GET() {
  const todos = await TodoModel.find({});
  return NextResponse.json({ todos: todos });
}

export async function POST(req: NextRequest) {
  const { title, description } = await req.json();
  await TodoModel.create({ title, description });
  return NextResponse.json({ msg: "Todo created!" });
}

export async function DELETE(req: NextRequest) {
  const mongoId = req.nextUrl.searchParams.get("mongoId");
  await TodoModel.findByIdAndDelete(mongoId);
  return NextResponse.json({ msg: "Todo deleted!" });
}

export async function PUT(req: NextRequest) {
  const mongoId = req.nextUrl.searchParams.get("mongoId");
  await TodoModel.findByIdAndUpdate(mongoId, {
    $set: {
      isCompleted: true,
    },
  });
  return NextResponse.json({ msg: "Task completed!" });
}
