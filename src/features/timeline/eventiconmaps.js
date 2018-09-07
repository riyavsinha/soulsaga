import {
  AccountIcon,
  AccountGroupIcon,
  AtomIcon,
  BookOpenIcon,
  BriefcaseIcon,
  CreationIcon,
  CurrencyUsdIcon,
  DumbbellIcon,
  EarthIcon,
  FoodIcon,
  HeartIcon,
  HomeIcon,
  HospitalIcon,
  LockIcon,
  PaletteIcon,
  PineTreeIcon,
  SchoolIcon,
  VectorCircleIcon} from 'mdi-react';
import React from 'react';

const PRIMARY_CATEGORIES = {
  "Community": <VectorCircleIcon/>,
  "Education": <SchoolIcon/>,
  "Family": <HomeIcon/>,
  "Financial": <CurrencyUsdIcon/>,
  "Fitness": <DumbbellIcon/>,
  "Intellectual": <BookOpenIcon/>,
  "Love/Romance": <HeartIcon/>,
  "Medical": <HospitalIcon/>,
  "Personal": <AccountIcon/>,
  "Social": <AccountGroupIcon/>,
  "Spiritual": <CreationIcon/>,
  "Travel": <EarthIcon/>,
  "Work/Career": <BriefcaseIcon/>,
}

const SECONDARY_CATEGORIES = {
  "Artistic": <PaletteIcon/>,
  "Culinary": <FoodIcon/>,
  "Nature": <PineTreeIcon/>,
  "Science": <AtomIcon/>,
}

const CATEGORY_ICON_MAP = {
  "Artistic": <PaletteIcon/>,
  "Community": <VectorCircleIcon/>,
  "Culinary": <FoodIcon/>,
  "Education": <SchoolIcon/>,
  "Family": <HomeIcon/>,
  "Financial": <CurrencyUsdIcon/>,
  "Fitness": <DumbbellIcon/>,
  "Intellectual": <BookOpenIcon/>,
  "Love/Romance": <HeartIcon/>,
  "Medical": <HospitalIcon/>,
  "Nature": <PineTreeIcon/>,
  "Personal": <AccountIcon/>,
  "Science": <AtomIcon/>,
  "Security": <LockIcon/>,
  "Social": <AccountGroupIcon/>,
  "Spiritual": <CreationIcon/>,
  "Travel": <EarthIcon/>,
  "Work/Career": <BriefcaseIcon/>,
  "Other": "R",
}

export { CATEGORY_ICON_MAP, PRIMARY_CATEGORIES, SECONDARY_CATEGORIES };