export enum JobLevel {
  Intern = "INTERN",
  Junior = "JUNIOR",
  Middle = "MIDDLE",
  Senior = "SENIOR",
  Lead = "LEAD",
  CTO = "CTO"
}

export enum JobScope {
  Backend = "BACKEND",
  Frontend = "FRONTEND",
  Android = "ANDROID",
  IOS = "IOS",
  DevOps = "DEVOPS",
  QA = "QA",
  Security = "SECURITY",
  DataScience = "DS",
  Designer = "DESIGNER"
}

export class JobSalary {
  min: number;
  max: number;
}

export class JobLocation {
  country: string;
  city: string;
}

export class JobContact {
  email: string;
  phone: string;
  telegram: string;
}

export class JobModel {
  id: string;
  verified: boolean;
  premium: boolean;

  contact: JobContact;

  location: JobLocation;
  salary: JobSalary;
  level: JobLevel;
  scope: JobScope;

  stack: Array<string>;
  remote: boolean;
  description: string;
}
