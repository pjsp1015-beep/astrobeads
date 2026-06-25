import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    await prisma.category.upsert({ where:{slug:'precious'}, update:{}, create:{name:'Precious Stones',slug:'precious',emoji:'gem'} })
    await prisma.category.upsert({ where:{slug:'semi-precious'}, update:{}, create:{name:'Semi-Precious',slug:'semi-precious',emoji:'crystal'} })
    await prisma.category.upsert({ where:{slug:'rudraksha'}, update:{}, create:{name:'Rudraksha',slug:'rudraksha',emoji:'rudraksha'} })
    await prisma.category.upsert({ where:{slug:'jewellery'}, update:{}, create:{name:'Jewellery',slug:'jewellery',emoji:'ring'} })
    await prisma.category.upsert({ where:{slug:'organic'}, update:{}, create:{name:'Organic Gems',slug:'organic',emoji:'pearl'} })
    const precious = await prisma.category.findUnique({where:{slug:'precious'}})
    const semi = await prisma.category.findUnique({where:{slug:'semi-precious'}})
    const rudraksha = await prisma.category.findUnique({where:{slug:'rudraksha'}})
    const jewellery = await prisma.category.findUnique({where:{slug:'jewellery'}})
    const organic = await prisma.category.findUnique({where:{slug:'organic'}})
    if(!precious||!semi||!rudraksha||!jewellery||!organic) return NextResponse.json({success:false,error:'Categories missing'})
    await prisma.product.createMany({
      data: [
        {name:'Natural Ruby (Manik)',slug:'natural-ruby',description:'Certified Burma ruby, ideal for Sun. Enhances confidence, leadership and vitality.',price:12500,weight:2.5,origin:'Burma',emoji:'Ruby',bgColor:'#fff0f0',categoryId:precious.id,tag:'Precious',certified:true,certificate:'GII',treatment:'None',stock:4,specs:{Planet:'Sun'}},
        {name:'Blue Sapphire (Neelam)',slug:'blue-sapphire',description:'Premium Kashmir sapphire for Saturn. Known for rapid results in career and discipline.',price:18900,weight:3.2,origin:'Kashmir',emoji:'Sapphire',bgColor:'#e6f1fb',categoryId:precious.id,tag:'Precious',certified:true,certificate:'GRS',treatment:'None',stock:2,specs:{Planet:'Saturn'}},
        {name:'Colombian Emerald (Panna)',slug:'colombian-emerald',description:'Natural Colombian emerald for Mercury. Boosts intelligence, communication and business.',price:8400,weight:1.8,origin:'Colombia',emoji:'Emerald',bgColor:'#f0fdf4',categoryId:precious.id,tag:'Precious',certified:true,certificate:'Gubelin',treatment:'Minor Oil',stock:7,specs:{Planet:'Mercury'}},
        {name:'Yellow Sapphire (Pukhraj)',slug:'yellow-sapphire',description:'Sri Lanka yellow sapphire for Jupiter. Brings wisdom, prosperity and marital harmony.',price:5200,weight:4.1,origin:'Sri Lanka',emoji:'Yellow Sapphire',bgColor:'#fffbeb',categoryId:precious.id,tag:'Precious',certified:true,certificate:'GII',treatment:'None',stock:3,specs:{Planet:'Jupiter'}},
        {name:"Cat's Eye (Lehsunia)",slug:'cats-eye',description:'Chrysoberyl cats eye for Ketu. Provides protection, intuition and spiritual growth.',price:7800,weight:3.4,origin:'Sri Lanka',emoji:'Cats Eye',bgColor:'#fefce8',categoryId:precious.id,tag:'Precious',certified:true,certificate:'GII',treatment:'None',stock:3,specs:{Planet:'Ketu'}},
        {name:'Natural Pearl (Moti)',slug:'natural-pearl',description:'Basra pearl for Moon. Calms emotions, enhances creativity and brings inner peace.',price:3200,weight:6.2,origin:'Basra',emoji:'Pearl',bgColor:'#f9fafb',categoryId:organic.id,tag:'Organic',certified:true,certificate:'AGL',treatment:'None',stock:6,specs:{Planet:'Moon'}},
        {name:'Red Coral (Moonga)',slug:'red-coral',description:'Italian coral for Mars. Boosts courage, energy, health and removes obstacles.',price:2100,weight:7.0,origin:'Italy',emoji:'Coral',bgColor:'#fff1f2',categoryId:organic.id,tag:'Organic',certified:false,treatment:'None',stock:8,specs:{Planet:'Mars'}},
        {name:'Hessonite (Gomed)',slug:'hessonite-gomed',description:'Ceylon hessonite for Rahu. Removes confusion, delays and brings clarity of mind.',price:1850,weight:5.5,origin:'Sri Lanka',emoji:'Hessonite',bgColor:'#fdf4e7',categoryId:semi.id,tag:'Semi-Precious',certified:false,treatment:'None',stock:12,specs:{Planet:'Rahu'}},
        {name:'Amethyst',slug:'amethyst',description:'Brazilian amethyst birthstone for February. Promotes calm, balance and spiritual awareness.',price:650,weight:8.0,origin:'Brazil',emoji:'Amethyst',bgColor:'#f5f3ff',categoryId:semi.id,tag:'Semi-Precious',certified:false,treatment:'None',stock:25,specs:{Birthstone:'February'}},
        {name:'Blue Topaz',slug:'blue-topaz',description:'Swiss blue topaz for November birthstone. Enhances communication, creativity and focus.',price:420,weight:10.0,origin:'Brazil',emoji:'Topaz',bgColor:'#e0f2fe',categoryId:semi.id,tag:'Semi-Precious',certified:false,treatment:'Irradiation',stock:18,specs:{Birthstone:'November'}},
        {name:'5 Mukhi Rudraksha',slug:'5-mukhi-rudraksha',description:'Five-faced Rudraksha from Nepal. Most common and versatile, ruled by Jupiter for wisdom.',price:251,weight:0,origin:'Nepal',emoji:'Rudraksha',bgColor:'#fdf6ec',categoryId:rudraksha.id,tag:'Rudraksha',certified:false,treatment:'None',stock:50,specs:{Mukhis:'5'}},
        {name:'1 Mukhi Rudraksha',slug:'1-mukhi-rudraksha',description:'Rarest one-faced Rudraksha from Nepal. Represents Shiva, brings liberation and supreme consciousness.',price:5100,weight:0,origin:'Nepal',emoji:'Rudraksha',bgColor:'#fdf6ec',categoryId:rudraksha.id,tag:'Rudraksha',certified:true,certificate:'Lab Certified',treatment:'None',stock:5,specs:{Mukhis:'1'}},
        {name:'7 Mukhi Rudraksha',slug:'7-mukhi-rudraksha',description:'Seven-faced Rudraksha for wealth and prosperity. Ruled by Mahalakshmi, removes financial obstacles.',price:851,weight:0,origin:'Nepal',emoji:'Rudraksha',bgColor:'#fdf6ec',categoryId:rudraksha.id,tag:'Rudraksha',certified:false,treatment:'None',stock:20,specs:{Mukhis:'7'}},
        {name:'108 Bead Rudraksha Mala',slug:'rudraksha-mala-108',description:'Traditional 108-bead japa mala from Nepal. Complete mala for meditation, chanting and spiritual practice.',price:1251,weight:0,origin:'Nepal',emoji:'Mala',bgColor:'#fdf6ec',categoryId:rudraksha.id,tag:'Rudraksha',certified:false,treatment:'None',stock:15,specs:{Beads:'108'}},
        {name:'Ruby Silver Ring',slug:'ruby-silver-ring',description:'Natural ruby set in 925 sterling silver. Handcrafted astrological ring for Sun planet benefits.',price:4500,weight:0,origin:'India',emoji:'Ring',bgColor:'#fff0f0',categoryId:jewellery.id,tag:'Jewellery',certified:false,treatment:'None',stock:10,specs:{Metal:'925 Silver'}},
        {name:'Blue Sapphire Gold Pendant',slug:'blue-sapphire-pendant',description:'Certified sapphire in 22k gold pendant. Elegant astrological jewellery with GII certification.',price:28500,weight:0,origin:'India',emoji:'Pendant',bgColor:'#e6f1fb',categoryId:jewellery.id,tag:'Jewellery',certified:true,certificate:'GII',treatment:'None',stock:4,specs:{Metal:'22k Gold'}},
      ],
      skipDuplicates: true,
    })
    const count = await prisma.product.count()
    return NextResponse.json({success:true,message:'Seeded! Products: '+count})
  } catch(e:any) {
    return NextResponse.json({success:false,error:e.message},{status:500})
  }
}