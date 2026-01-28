export enum Status {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
}

export enum AccountStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DEACTIVATE = 'DEACTIVATE',
}

export enum UserInquiryStatus {
  CREATED = 'CREATED',

  COMPLETED = 'COMPLETED',
  APPROVED = 'APPROVED',
  DECLINED = 'DECLINED',
  EXPIRED = 'EXPIRED',
  FAILED = 'FAILED',
  REDACTED = 'REDACTED',
  STARTED = 'STARTED',
}

export enum AccountAccessibility {
  DISABLED = 'DISABLED',
  ENABLED = 'ENABLED',
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export enum Language {
  ENG_US = 'ENG_US',
  ENG_UK = 'ENG_UK',
}

export enum Role {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  USER = 'USER',
  PROFESSIONAL = 'PROFESSIONAL',
}

export enum RelationshipStatus {
  SINGLE = 'Single',
  MARRIED = 'Married',
  ENGAGED = 'Engaged',
  SEPERATED = 'Seperated',
  DIVORCED = 'Divorced',
  WIDOWED = 'Widowed',
  COMPLICATED = 'Complicated',
}

export enum ReligiousAffiliation {
  ISLAM = 'Islam',
  CHRISTIANITY = 'Christianity',
  HINDUISM = 'Hinduism',
  BUDDHISM = 'Buddhism',
  OTHER = 'Other',
}
