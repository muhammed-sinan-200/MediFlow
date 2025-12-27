import appointment_img from './appointment_img.png'
import header_img from './header_img.png'
import banner1 from './banner1.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import logo from './logo.svg'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'
import doc1 from './doc1.png'
import doc2 from './doc2.png'
import doc3 from './doc3.png'
import doc4 from './doc4.png'
import doc5 from './doc5.png'
import doc6 from './doc6.png'
import doc7 from './doc7.png'
import doc8 from './doc8.png'
import doc9 from './doc9.png'
import doc10 from './doc10.png'
import doc11 from './doc11.png'
import doc12 from './doc12.png'
import doc13 from './doc13.png'
import doc14 from './doc14.png'
import doc15 from './doc15.png'
import my_portrait from './my_portrait.jpg'
import Dermatologist from './Dermatologist.svg'
import Gastroenterologist from './Gastroenterologist.svg'
import General_physician from './General_physician.svg'
import Gynecologist from './Gynecologist.svg'
import Neurologist from './Neurologist.svg'
import Pediatricians from './Pediatricians.svg'
import Hospital_wheelchair from './Hospital_wheelchair.png'
import Hospital_patient from './Hospital_patient.png'
import Hospital_family from './Hospital_family.png'
import Hospital_building from './Hospital_building.png'
import Hospital_bed from './Hospital_bed.png'
import Health_team from './Health_team.png'
import Contact_us from './Contact_us.png'
import Doctors from './Doctors.png'
import Doctor from './Doctor.png'
import CT_scan from './CT_scan.png'
import Blood_donation from './Blood_donation.png'
import Ambulance from './Ambulance.png'
import Medicine from './Medicine.png'
import { Baby, Brain, HeartPlus, HeartPulse, Sparkles, Stethoscope } from 'lucide-react'


export const assets = {
  appointment_img,
  header_img,
  banner1,
  group_profiles,
  logo,
  my_portrait,
  chats_icon,
  verified_icon,
  info_icon,
  profile_pic,
  arrow_icon,
  contact_image,
  about_image,
  menu_icon,
  cross_icon,
  dropdown_icon,
  upload_icon,
  stripe_logo,
  razorpay_logo,
  Hospital_wheelchair,
  Hospital_patient,
  Hospital_family,
  Hospital_building,
  Hospital_bed,
  Health_team,
  Doctors,
  Doctor,
  CT_scan,
  Blood_donation,
  Ambulance,
  Medicine,
  Contact_us
}

export const specialityData = [
  {
    speciality: 'General Physician',
    image: General_physician,
    description: 'Comprehensive primary care for all age groups.',
    icon: Stethoscope,
  },
  {
    speciality: 'Gynecologist',
    image: Gynecologist,
    description: 'Expert care for women’s health and reproductive system.',
    icon: HeartPulse
  },
  {
    speciality: 'Dermatologist',
    image: Dermatologist,
    description: 'Specialized treatment for skin, hair, and nail conditions.',
    icon: Sparkles
  },
  {
    speciality: 'Pediatrician',
    image: Pediatricians,
    description: 'Caring for the health and wellness of children.',
    icon: Baby
  },
  {
    speciality: 'Neurologist',
    image: Neurologist,
    description: 'Diagnosis and treatment of nervous system disorders.',
    icon: Brain
  },
  {
    speciality: 'Gastroenterologist',
    image: Gastroenterologist,
    description: 'Specialized care for digestive system and liver.',
    icon: HeartPlus
  },
]


export const doctors = [
  {
    _id: 'doc1',
    name: 'Dr. Anil Kumar',
    image: doc1,
    speciality: 'General Physician',
    degree: 'MBBS, MD',
    experience: '6 Years',
    about: 'Dr. Anil Kumar specializes in preventive healthcare and early diagnosis of common illnesses. He believes in patient education and long-term wellness through proper treatment and lifestyle guidance.',
    fees: 500,
    address: {
      line1: 'MG Road',
      line2: 'Ernakulam, Kochi, Kerala'
    }
  },
  {
    _id: 'doc2',
    name: 'Dr. Ramesh Kumar',
    image: doc2,
    speciality: 'Gynecologist',
    degree: 'MBBS, MS (OBG)',
    experience: '5 Years',
    about: 'Dr. Ramesh Kumar focuses on women’s health and pregnancy care. He provides personalized treatment and guidance for gynecological conditions at every stage of life.',
    fees: 700,
    address: {
      line1: 'Civil Lines',
      line2: 'Jaipur, Rajasthan'
    }
  },
  {
    _id: 'doc3',
    name: 'Dr. Rohan Iyer',
    image: doc3,
    speciality: 'Dermatologist',
    degree: 'MBBS, MD (Dermatology)',
    experience: '3 Years',
    about: 'Dr. Rohan Iyer treats skin, hair, and nail disorders using modern medical techniques. He also provides cosmetic dermatology solutions with a patient-friendly approach.',
    fees: 600,
    address: {
      line1: 'CG Road',
      line2: 'Ahmedabad, Gujarat'
    }
  },
  {
    _id: 'doc4',
    name: 'Dr. Neha Patel',
    image: doc4,
    speciality: 'Pediatrician',
    degree: 'MBBS, MD (Pediatrics)',
    experience: '4 Years',
    about: 'Dr. Neha Patel is dedicated to child healthcare and overall development. She focuses on growth monitoring, vaccinations, and preventive pediatric care.',
    fees: 500,
    address: {
      line1: 'Anna Nagar',
      line2: 'Chennai, Tamil Nadu'
    }
  },
  {
    _id: 'doc5',
    name: 'Dr. Suresh Menon',
    image: doc5,
    speciality: 'Gastroenterologist',
    degree: 'MBBS, DM (Neurology)',
    experience: '8 Years',
    about: 'Dr. Suresh Menon provides specialized care for complex neurological conditions. He follows a patient-centered approach with accurate diagnosis and advanced treatment methods.',
    fees: 1000,
    address: {
      line1: 'Vyttila',
      line2: 'Kochi, Kerala'
    }
  },
  {
    _id: 'doc6',
    name: 'Dr. Amit Verma',
    image: doc6,
    speciality: 'Neurologist',
    degree: 'MBBS, DM (Neurology)',
    experience: '7 Years',
    about: 'Dr. Amit Verma has extensive experience in treating disorders of the brain and nervous system. He focuses on evidence-based treatment and long-term patient care.',
    fees: 900,
    address: {
      line1: 'Indiranagar',
      line2: 'Bengaluru, Karnataka'
    }
  },
  {
    _id: 'doc7',
    name: 'Dr. Mohammed Faizal',
    image: doc7,
    speciality: 'General Physician',
    degree: 'MBBS',
    experience: '5 Years',
    about: 'Dr. Mohammed Faizal provides complete primary healthcare services for all age groups. He emphasizes early diagnosis and continuous patient support.',
    fees: 400,
    address: {
      line1: 'Palayam',
      line2: 'Kozhikode, Kerala'
    }
  },
  {
    _id: 'doc8',
    name: 'Dr. Kavya Nair',
    image: doc8,
    speciality: 'Gynecologist',
    degree: 'MBBS, MS (OBG)',
    experience: '6 Years',
    about: 'Dr. Kavya Nair specializes in maternal care and women’s wellness. She offers compassionate treatment and personalized guidance throughout pregnancy and beyond.',
    fees: 800,
    address: {
      line1: 'Kakkanad',
      line2: 'Kochi, Kerala'
    }
  },
  {
    _id: 'doc9',
    name: 'Dr. Arjun Sundar',
    image: doc9,
    speciality: 'Dermatologist',
    degree: 'MBBS, MD (Dermatology)',
    experience: '4 Years',
    about: 'Dr. Arjun Sundar is skilled in both clinical and cosmetic dermatology. He provides effective treatment for various skin concerns using modern techniques.',
    fees: 650,
    address: {
      line1: 'Sector 18',
      line2: 'Noida, Uttar Pradesh'
    }
  },
  {
    _id: 'doc10',
    name: 'Dr. Sneha Kulkarni',
    image: doc10,
    speciality: 'Pediatrician',
    degree: 'MBBS, MD (Pediatrics)',
    experience: '5 Years',
    about: 'Dr. Sneha Kulkarni focuses on providing quality healthcare for children. She believes in preventive care and child-friendly medical practices.',
    fees: 550,
    address: {
      line1: 'Shivajinagar',
      line2: 'Pune, Maharashtra'
    }
  },
  {
    _id: 'doc11',
    name: 'Dr. Anamika Ravi',
    image: doc11,
    speciality: 'Neurologist',
    degree: 'MBBS, DM (Neurology)',
    experience: '9 Years',
    about: 'Dr. Anamika Ravi has strong expertise in managing complex neurological disorders. She is known for her accurate diagnosis and compassionate care.',
    fees: 1100,
    address: {
      line1: 'Lajpat Nagar',
      line2: 'New Delhi'
    }
  },
  {
    _id: 'doc12',
    name: 'Dr. Vinod Rao',
    image: doc12,
    speciality: 'Gastroenterologist',
    degree: 'MBBS, DM (Neurology)',
    experience: '10 Years',
    about: 'Dr. Vinod Rao offers advanced neurological treatments using modern medical practices. He focuses on long-term recovery and patient well-being.',
    fees: 1200,
    address: {
      line1: 'Banjara Hills',
      line2: 'Hyderabad, Telangana'
    }
  },
  {
    _id: 'doc13',
    name: 'Dr. Sunitha Reddy',
    image: doc13,
    speciality: 'General Physician',
    degree: 'MBBS',
    experience: '6 Years',
    about: 'Dr. Sunitha Reddy provides holistic and preventive healthcare services. She focuses on maintaining long-term health through early medical intervention.',
    fees: 450,
    address: {
      line1: 'Madhapur',
      line2: 'Hyderabad, Telangana'
    }
  },
  {
    _id: 'doc14',
    name: 'Dr.Arun Das',
    image: doc14,
    speciality: 'Gynecologist',
    degree: 'MBBS, MS (OBG)',
    experience: '7 Years',
    about: 'Dr. Arun Das offers compassionate and reliable gynecological care. He focuses on women’s health, pregnancy support, and preventive treatments.',
    fees: 850,
    address: {
      line1: 'Rajouri Garden',
      line2: 'New Delhi'
    }
  },
  {
    _id: 'doc15',
    name: 'Dr. Pooja Malhotra ',
    image: doc15,
    speciality: 'Dermatologist',
    degree: 'MBBS, MD (Dermatology)',
    experience: '3 Years',
    about: 'Dr. Pooja Malhotra treats various skin and hair conditions with modern dermatology techniques. She focuses on safe, effective, and personalized care.',
    fees: 600,
    address: {
      line1: 'Palarivattom',
      line2: 'Kochi, Kerala'
    }
  }
]

