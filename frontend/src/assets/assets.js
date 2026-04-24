import group_profiles from './group_profiles.png'
import cross_icon from './cross_icon.png'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
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

import hero_slide1 from './hero_slide1.png'
import hero_slide2 from './hero_slide2.png'
import hero_slide3 from './hero_slide3.png'
import hero_slide4 from './hero_slide4.png'
import hero_slide5 from './hero_slide5.png'
import hero_slide6 from './hero_slide6.png'

import { Baby, Brain, HeartPlus, HeartPulse, Sparkles, Stethoscope } from 'lucide-react'


export const assets = {
  group_profiles,
  my_portrait,
  verified_icon,
  info_icon,
  arrow_icon,
  cross_icon,
  upload_icon,
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
  Contact_us,
  hero_slide1,
  hero_slide2,
  hero_slide3,
  hero_slide4,
  hero_slide5,
  hero_slide6,
}


export const heroSlides = [
  {
    id: 1,
    image: hero_slide1,
    eyebrow: 'Trusted Doctors',
    title: 'Consult experienced doctors without stepping out',
    description:
      'Get reliable medical guidance from certified professionals through simple and secure online consultations.',
    primaryCta: { label: 'Book Appointment', href: '#speciality' },
    secondaryCta: { label: 'View Doctors', href: '#doctors' },
    imagePosition: 'object-center',
  },
  {
    id: 2,
    image: hero_slide2,
    eyebrow: 'Senior Care',
    title: 'Healthcare support for seniors, right from home',
    description:
      'Enable elderly patients to consult doctors easily through video calls, without the need to travel.',
    primaryCta: { label: 'Start Consultation', href: '#speciality' },
    imagePosition: 'object-left',
  },
  {
    id: 3,
    image: hero_slide3,
    eyebrow: 'Complete Care',
    title: 'All your healthcare needs in one place',
    description:
      'From consultations to ongoing care, manage your health journey with a simple and connected platform.',
    primaryCta: { label: 'Explore Services', href: '/about' },
    imagePosition: 'object-center',
  },
  {
    id: 4,
    image: hero_slide4,
    eyebrow: 'Online Consultation',
    title: 'Talk to doctors from the comfort of your home',
    description:
      'Secure video consultations that save time and make quality healthcare easily accessible.',
    primaryCta: { label: 'Consult Now', href: '#speciality' },
    imagePosition: 'object-right',
  },
  {
    id: 5,
    image: hero_slide5,
    eyebrow: 'Family Care',
    title: 'Quick medical help for you and your child',
    description:
      'Get timely guidance from doctors for everyday health concerns without waiting or travel.',
    primaryCta: { label: 'Get Help Now', href: '/contact' },
    imagePosition: 'object-left',
  },
  {
    id: 6,
    image: hero_slide6,
    eyebrow: 'For Every Generation',
    title: 'Healthcare designed for the whole family',
    description:
      'From children to seniors, MediFlow connects every member of your family to reliable care in one place.',
    primaryCta: { label: 'Get Started', href: '#speciality' },
    secondaryCta: { label: 'Contact Us', href: '/contact' },
    imagePosition: 'object-center',
  },
]


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



