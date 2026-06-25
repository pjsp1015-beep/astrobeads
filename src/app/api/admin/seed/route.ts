import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    await prisma.category.upsert({ where:{slug:'precious'}, update:{}, create:{name:'Precious Stones',slug:'precious',emoji:'gem'} })
    await prisma.category.upsert({ where:{slug:'semi-precious'}, update:{}, create:{name:'Semi-Precious',slug:'semi-precious',emoji:'crystal'} })
    await prisma.category.upsert({ where:{slug:'rudraksha'}, update:{}, create:{name:'Rudraksha',slug:'rudraksha',emoji:'rudraksha'} })
    await prisma.category.upsert({ where:{slug:'jewellery'}, update:{}, create:{name:'Jewellery',slug:'jewellery',emoji:'ring'} })
    await prisma.category.upsert({ where:{slug:'organic'}, update:{}, create:{name:'Organic Gems',slug:'organic',emoji:'pearl'} })
    const count = await prisma.product.count()
    return NextResponse.json({success:true,message:'Done! Products: '+count})
  } catch(e:any) {
    return NextResponse.json({success:false,error:e.message},{status:500})
  }
}