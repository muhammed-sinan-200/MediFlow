import arrow_icon from './arrow_icon.svg'
import Dermatologist from './Dermatologist.svg'
import Gastroenterologist from './Gastroenterologist.svg'
import General_physician from './General_physician.svg'
import Gynecologist from './Gynecologist.svg'
import Neurologist from './Neurologist.svg'
import Pediatricians from './Pediatricians.svg'
import Hospital_family from './Hospital_family.webp'
import Hospital_building from './Hospital_building.webp'
import Hospital_bed from './Hospital_bed.webp'
import Health_team from './Health_team.webp'
import Contact_us from './Contact_us.webp'
import Doctors from './Doctors.webp'
import CT_scan from './CT_scan.webp'
import Blood_donation from './Blood_donation.webp'
import Ambulance from './Ambulance.webp'

import hero_slide1 from './hero_slide1.webp'
import hero_slide2 from './hero_slide2.webp'
import hero_slide3 from './hero_slide3.webp'
import hero_slide4 from './hero_slide4.webp'
import hero_slide5 from './hero_slide5.webp'
import hero_slide6 from './hero_slide6.webp'

import { Baby, Brain, HeartPlus, HeartPulse, Sparkles, Stethoscope } from 'lucide-react'


export const assets = {
  arrow_icon,
  Hospital_family,
  Hospital_building,
  Hospital_bed,
  Health_team,
  Doctors,
  CT_scan,
  Blood_donation,
  Ambulance,
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



