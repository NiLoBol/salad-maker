
import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';
import { DATAT } from '../../Type';

export async function GET() {
  // กำหนดเส้นทางไปยังไฟล์ data.json ในโฟลเดอร์ public
  const jsonDirectory = path.join(process.cwd(), 'public');
  const fileContents = await fs.readFile(path.join(jsonDirectory, 'data.json'), 'utf8');
  
  // ส่งข้อมูล JSON กลับไปยัง client
  return NextResponse.json(JSON.parse(fileContents));
}

// export async function POST() {
//   // กำหนดเส้นทางไปยังไฟล์ data.json ในโฟลเดอร์ public
//   const jsonDirectory = path.join(process.cwd(), 'public');
//   const fileContents = await fs.readFile(path.join(jsonDirectory, 'data.json'), 'utf8');
  
//   // ส่งข้อมูล JSON กลับไปยัง client
//   return NextResponse.json(JSON.parse(fileContents));
// }

