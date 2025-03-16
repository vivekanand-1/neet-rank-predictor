import { Router } from 'express';

const router = Router();

router.get('/:rank', (req, res) => {
  const rank = Number(req.params.rank);
  
  const colleges = [
    { name: "AIIMS Delhi", cutoff: 100 },
    { name: "AIIMS Bhopal", cutoff: 200 },
    { name: "AIIMS Bhubaneswar", cutoff: 375 },
    { name: "AIIMS Jodhpur", cutoff: 470 },
    { name: "AIIMS Patna", cutoff: 660 },
    { name: "AIIMS Rishikesh", cutoff: 865 },
    { name: "AIIMS Raipur", cutoff: 960 },
    { name: "AIIMS Gorakhpur", cutoff: 555 },
    { name: "JIPMER Puducherry", cutoff: 5000 },
    { name: "AFMC Pune", cutoff: 1000 },
    { name: "KMC Manipal", cutoff: 6000 },
    { name: "Lady Hardinge Medical College", cutoff: 1170 },
    { name: "Maulana Azad Medical College", cutoff: 6590 },
    { name: "Grant Medical College Mumbai", cutoff: 7000 },
    { name: "King George's Medical University Lucknow", cutoff: 9000 },
    { name: "Mysore Medical College", cutoff: 10000 },
    { name: "Sree Chitra Tirunal Institute for Medical Sciences and Technology", cutoff: 650 },
    { name: "VMMC and Safdarjung Hospital", cutoff: 680 },
    { name: "Banaras Hindu University", cutoff: 67000 }
  ];  

  const eligibleColleges = colleges.filter(c => rank <= c.cutoff);

  if (eligibleColleges.length === 0) {
    return res.json({ message: "Better luck next time" });
  }

  res.json({ colleges: eligibleColleges });
});

export default router;
