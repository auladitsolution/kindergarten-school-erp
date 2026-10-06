export type UserRole =
  | "super_admin"
  | "school_admin"
  | "principal"
  | "teacher"
  | "accountant"
  | "parent"
  | "student";

export type UserStatus = "pending" | "active" | "suspended";

export interface IUser {
  _id?: string;
  firebaseUid: string;
  email: string;
  name: string;
  role: UserRole;
  status: UserStatus;
  phone?: string;
  avatar?: string;
  linkedEntityId?: string; // Links to Student, Guardian or Teacher ID
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface IGuardian {
  _id?: string;
  userId?: string;
  name: string;
  nameBn?: string;
  relation: "Father" | "Mother" | "Legal Guardian" | "Other";
  phone: string;
  email?: string;
  nid?: string;
  profession?: string;
  address: string;
  linkedStudentIds: string[];
  createdAt?: string | Date;
}

export interface IStudent {
  _id?: string;
  studentId: string; // e.g. KGS-2026-0001
  admissionNo: string;
  name: string;
  nameBn?: string;
  classId: string;
  className?: string;
  sectionId: string;
  sectionName?: string;
  rollNo: number;
  dob: string;
  gender: "Male" | "Female" | "Other";
  bloodGroup?: string;
  religion?: string;
  address: string;
  photoUrl?: string;
  guardianId: string;
  guardianName?: string;
  guardianPhone?: string;
  admissionDate: string;
  academicYear: string;
  enrollmentStatus: "active" | "alumni" | "withdrawn";
  emergencyContact: string;
  remarks?: string;
  createdAt?: string | Date;
}

export interface ITeacher {
  _id?: string;
  userId?: string;
  employeeId: string;
  name: string;
  nameBn?: string;
  designation: string;
  qualification: string;
  joiningDate: string;
  phone: string;
  email: string;
  assignedClasses: string[];
  assignedSubjects: string[];
  salary?: number;
  photoUrl?: string;
  bio?: string;
  isClassTeacher?: boolean;
  classTeacherOf?: string; // Class & Section ID
  createdAt?: string | Date;
}

export interface IClass {
  _id?: string;
  name: string; // Play, Nursery, KG, KG-1, Class 1
  nameBn?: string;
  code: string;
  level: number;
  description?: string;
  sections?: ISection[];
}

export interface ISection {
  _id?: string;
  classId: string;
  name: string; // Rose, Tulip, Lily
  capacity: number;
  classTeacherId?: string;
  classTeacherName?: string;
}

export interface ISubject {
  _id?: string;
  classId: string;
  name: string;
  nameBn?: string;
  code: string;
  evaluationType: "marks" | "skill_grade";
  totalMarks?: number;
  passMarks?: number;
}

export interface IAttendance {
  _id?: string;
  targetType: "student" | "staff";
  targetId: string;
  studentName?: string;
  classId?: string;
  sectionId?: string;
  date: string; // YYYY-MM-DD
  status: "present" | "absent" | "late" | "excused";
  remarks?: string;
  recordedBy?: string;
  createdAt?: string | Date;
}

export interface IExam {
  _id?: string;
  academicYear: string;
  title: string;
  term: "First Term" | "Mid Term" | "Final Term" | "Monthly Test";
  startDate: string;
  endDate: string;
  isPublished: boolean;
}

export interface IResult {
  _id?: string;
  examId: string;
  studentId: string;
  studentName?: string;
  classId: string;
  sectionId: string;
  rollNo?: number;
  subjectMarks: {
    subjectId: string;
    subjectName: string;
    marksObtained?: number;
    highestMarks?: number;
    grade?: string;
    skillRatings?: {
      skillName: string;
      rating: "Needs Work" | "Good" | "Excellent" | "Star";
    }[];
  }[];
  totalMarks?: number;
  averageMarks?: number;
  overallGrade?: string;
  teacherRemarks?: string;
  status: "draft" | "published";
}

export interface IFeeStructure {
  _id?: string;
  academicYear: string;
  classId: string;
  className?: string;
  feeType: "Admission" | "Tuition" | "Exam" | "Session" | "Transport" | "Activity";
  amount: number;
  frequency: "one_time" | "monthly" | "per_term" | "yearly";
}

export interface IFeeInvoice {
  _id?: string;
  invoiceNo: string;
  studentId: string;
  studentName?: string;
  classId: string;
  className?: string;
  month: string;
  academicYear: string;
  dueDate: string;
  items: {
    feeType: string;
    amount: number;
  }[];
  totalAmount: number;
  discount: number;
  payableAmount: number;
  paidAmount: number;
  balance: number;
  status: "paid" | "partial" | "unpaid";
  createdAt?: string | Date;
}

export interface IPayment {
  _id?: string;
  paymentRef: string;
  invoiceId: string;
  invoiceNo?: string;
  studentId: string;
  studentName?: string;
  amount: number;
  paymentMethod: "cash" | "bank" | "bkash" | "nagad";
  transactionRef?: string;
  verifiedBy?: string;
  verifiedByName?: string;
  status: "verified" | "pending" | "rejected";
  paymentDate: string;
  receiptUrl?: string;
  notes?: string;
}

export interface IExpense {
  _id?: string;
  title: string;
  category: "Salaries" | "Utilities" | "Classroom Supplies" | "Maintenance" | "Events" | "Other";
  amount: number;
  date: string;
  payee: string;
  receiptUrl?: string;
  approvedBy?: string;
  notes?: string;
}

export interface IAdmission {
  _id?: string;
  applicationNo: string; // e.g. ADM-2026-001
  appliedClass: string;
  session: string;
  // Child Details
  childName: string;
  childNameBn?: string;
  dob: string;
  gender: "Male" | "Female" | "Other";
  bloodGroup?: string;
  previousSchool?: string;
  // Guardian Details
  fatherName: string;
  fatherPhone: string;
  fatherOccupation?: string;
  motherName: string;
  motherPhone?: string;
  motherOccupation?: string;
  presentAddress: string;
  permanentAddress?: string;
  email: string;
  // Documents
  birthCertificateUrl?: string;
  childPhotoUrl?: string;
  // Status
  status: "submitted" | "under_review" | "approved" | "rejected" | "enrolled";
  reviewNotes?: string;
  submittedAt: string;
}

export interface INotice {
  _id?: string;
  title: string;
  titleBn?: string;
  content: string;
  contentBn?: string;
  audience: "all" | "parents" | "teachers" | "public";
  priority: "normal" | "important" | "urgent";
  attachmentUrl?: string;
  publishedDate: string;
  isActive: boolean;
  authorName?: string;
}

export interface IEvent {
  _id?: string;
  title: string;
  titleBn?: string;
  description: string;
  descriptionBn?: string;
  date: string;
  time?: string;
  venue: string;
  coverImage?: string;
  category: "Celebration" | "Sports" | "Academic" | "Cultural" | "Holiday";
  isPublic: boolean;
}

export interface ICMSContent {
  _id?: string;
  section: "school_info" | "hero" | "about" | "programs" | "facilities" | "testimonials" | "faqs" | "contact";
  data: Record<string, any>;
  updatedBy?: string;
  updatedAt?: string;
}

export interface IAuditLog {
  _id?: string;
  userId?: string;
  userName?: string;
  userRole?: string;
  action: string;
  module: string;
  details: string;
  ipAddress?: string;
  timestamp: string | Date;
}
