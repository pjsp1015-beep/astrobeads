const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding categories...');

  const precious = await prisma.category.upsert({ where:{slug:'precious'}, update:{}, create:{name:'Precious Gems',slug:'precious',emoji:'gem'} });
  const semi = await prisma.category.upsert({ where:{slug:'semi-precious'}, update:{}, create:{name:'Semi-Precious',slug:'semi-precious',emoji:'stone'} });
  const rudraksha = await prisma.category.upsert({ where:{slug:'rudraksha'}, update:{}, create:{name:'Rudraksha',slug:'rudraksha',emoji:'bead'} });
  const jewellery = await prisma.category.upsert({ where:{slug:'jewellery'}, update:{}, create:{name:'Jewellery',slug:'jewellery',emoji:'ring'} });
  const organic = await prisma.category.upsert({ where:{slug:'organic'}, update:{}, create:{name:'Organic',slug:'organic',emoji:'coral'} });

  console.log('Categories done. Seeding products...');

  const products = [
    {name:'Natural Ruby (Manik)',slug:'natural-ruby',description:'Pigeon blood Burma ruby for Sun planet. Enhances confidence and authority.',price:12500,weight:2.5,origin:'Burma',emoji:'ruby',bgColor:'#fff0f0',categoryId:precious.id,tag:'Precious',certified:true,certificate:'GII',treatment:'None',stock:4,specs:{Shape:'Oval',Color:'Pigeon Blood Red',Planet:'Sun'}},
    {name:'Blue Sapphire (Neelam)',slug:'blue-sapphire',description:'Kashmir sapphire for Saturn. Enhances discipline and career growth.',price:18900,weight:3.2,origin:'Kashmir',emoji:'gem',bgColor:'#e6f1fb',categoryId:precious.id,tag:'Precious',certified:true,certificate:'GRS',treatment:'None',stock:2,specs:{Shape:'Cushion',Color:'Royal Blue',Planet:'Saturn'}},
    {name:'Colombian Emerald (Panna)',slug:'colombian-emerald',description:'Vivid green emerald for Mercury. Enhances communication and intelligence.',price:8400,weight:1.8,origin:'Colombia',emoji:'green',bgColor:'#f0fdf4',categoryId:precious.id,tag:'Precious',certified:true,certificate:'Gubelin',treatment:'Minor Oil',stock:7,specs:{Shape:'Emerald Cut',Color:'Vivid Green',Planet:'Mercury'}},
    {name:'Yellow Sapphire (Pukhraj)',slug:'yellow-sapphire',description:'Ceylon yellow sapphire for Jupiter. Brings wisdom and prosperity.',price:5200,weight:4.1,origin:'Sri Lanka',emoji:'star',bgColor:'#fffbeb',categoryId:precious.id,tag:'Precious',certified:true,certificate:'GII',treatment:'None',stock:3,specs:{Shape:'Round',Color:'Lemon Yellow',Planet:'Jupiter'}},
    {name:"Cat's Eye (Lehsunia)",slug:'cats-eye',description:"Chrysoberyl cat's eye for Ketu. Brings good fortune and intuition.",price:7800,weight:3.4,origin:'Sri Lanka',emoji:'eye',bgColor:'#fefce8',categoryId:precious.id,tag:'Precious',certified:true,certificate:'GII',treatment:'None',stock:3,specs:{Shape:'Cabochon',Color:'Honey Yellow',Planet:'Ketu'}},
    {name:'Natural Pearl (Moti)',slug:'natural-pearl',description:'Basra pearl for Moon. Enhances emotional balance and intuition.',price:3200,weight:6.2,origin:'Basra',emoji:'pearl',bgColor:'#f9fafb',categoryId:organic.id,tag:'Organic',certified:true,certificate:'AGL',treatment:'None',stock:6,specs:{Shape:'Round',Color:'Cream White',Planet:'Moon'}},
    {name:'Red Coral (Moonga)',slug:'red-coral',description:'Italian red coral for Mars. Boosts energy and courage.',price:2100,weight:7.0,origin:'Italy',emoji:'coral',bgColor:'#fff1f2',categoryId:organic.id,tag:'Organic',certified:false,treatment:'None',stock:8,specs:{Shape:'Triangular',Color:'Deep Red',Planet:'Mars'}},
    {name:'Hessonite Garnet (Gomed)',slug:'hessonite-garnet',description:'Honey brown garnet for Rahu. Removes negative effects and brings clarity.',price:1800,weight:5.5,origin:'Sri Lanka',emoji:'orange',bgColor:'#fffbeb',categoryId:semi.id,tag:'Semi-Precious',certified:false,treatment:'None',stock:12,specs:{Shape:'Oval',Color:'Honey Brown',Planet:'Rahu'}},
    {name:'Amethyst',slug:'amethyst',description:'Deep purple amethyst. February birthstone for calming energy.',price:650,weight:8.0,origin:'Brazil',emoji:'purple',bgColor:'#f5f3ff',categoryId:semi.id,tag:'Semi-Precious',certified:false,treatment:'None',stock:25,specs:{Shape:'Pear',Color:'Deep Purple',Birthstone:'February'}},
    {name:'Blue Topaz',slug:'blue-topaz',description:'Swiss blue topaz. Promotes communication and creativity.',price:420,weight:10.0,origin:'Brazil',emoji:'blue',bgColor:'#e0f2fe',categoryId:semi.id,tag:'Semi-Precious',certified:false,treatment:'Irradiation',stock:18,specs:{Shape:'Cushion',Color:'Swiss Blue',Birthstone:'November'}},
    {name:'5 Mukhi Rudraksha',slug:'5-mukhi-rudraksha',description:'Five-faced Rudraksha for general wellbeing and peace.',price:251,weight:0,origin:'Nepal',emoji:'bead',bgColor:'#fdf6ec',categoryId:rudraksha.id,tag:'Rudraksha',certified:false,treatment:'None',stock:50,specs:{Mukhis:'5',Deity:'Lord Shiva',Size:'18-20mm'}},
    {name:'1 Mukhi Rudraksha',slug:'1-mukhi-rudraksha',description:'Rarest Rudraksha for Supreme Shiva. Bestows spiritual liberation.',price:5100,weight:0,origin:'Nepal',emoji:'bead',bgColor:'#fdf6ec',categoryId:rudraksha.id,tag:'Rudraksha',certified:true,certificate:'Lab Certified',treatment:'None',stock:5,specs:{Mukhis:'1',Deity:'Supreme Shiva',Rarity:'Extremely Rare'}},
    {name:'7 Mukhi Rudraksha',slug:'7-mukhi-rudraksha',description:'Seven-faced Rudraksha for Mahalakshmi. Brings wealth and prosperity.',price:851,weight:0,origin:'Nepal',emoji:'bead',bgColor:'#fdf6ec',categoryId:rudraksha.id,tag:'Rudraksha',certified:false,treatment:'None',stock:20,specs:{Mukhis:'7',Deity:'Mahalakshmi',Benefit:'Wealth'}},
    {name:'108 Bead Rudraksha Mala',slug:'rudraksha-mala-108',description:'Traditional 108-bead mala for japa and meditation. Hand-knotted.',price:1251,weight:0,origin:'Nepal',emoji:'mala',bgColor:'#fdf6ec',categoryId:rudraksha.id,tag:'Rudraksha',certified:false,treatment:'None',stock:15,specs:{Beads:'108',Type:'5 Mukhi',Thread:'Silk'}},
    {name:'Ruby Silver Ring',slug:'ruby-silver-ring',description:'Natural ruby in 92.5 sterling silver. Astrological ring for Sun.',price:4500,weight:0,origin:'India',emoji:'ring',bgColor:'#fff0f0',categoryId:jewellery.id,tag:'Jewellery',certified:false,treatment:'None',stock:10,specs:{Metal:'92.5 Sterling Silver',Stone:'Natural Ruby',Planet:'Sun'}},
    {name:'Blue Sapphire Gold Pendant',slug:'blue-sapphire-pendant',description:'Natural blue sapphire in 22k gold pendant for Saturn.',price:28500,weight:0,origin:'India',emoji:'pendant',bgColor:'#e6f1fb',categoryId:jewellery.id,tag:'Jewellery',certified:true,certificate:'GII',treatment:'None',stock:4,specs:{Metal:'22k Gold',Stone:'Blue Sapphire',Planet:'Saturn'}},
  ];

  for (const p of products) {
    await prisma.product.upsert({ where:{slug:p.slug}, update:{}, create:p });
    process.stdout.write('.');
  }

  console.log('\nDone! Seeded ' + products.length + ' products.');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());