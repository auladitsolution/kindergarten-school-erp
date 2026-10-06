import { connectDB } from "./db";
import { ClassModel } from "@/models/Class";
import { StudentModel } from "@/models/Student";
import { GuardianModel } from "@/models/Guardian";
import { TeacherModel } from "@/models/Teacher";
import { FeeStructureModel } from "@/models/FeeStructure";
import { FeeInvoiceModel } from "@/models/FeeInvoice";
import { NoticeModel } from "@/models/Notice";
import { EventModel } from "@/models/Event";
import { AdmissionModel } from "@/models/Admission";
import { AttendanceModel } from "@/models/Attendance";
import { CMSContentModel } from "@/models/CMSContent";

export async function seedDatabaseIfEmpty() {
  try {
    await connectDB();
    const classCount = await ClassModel.countDocuments();
    if (classCount > 0) {
      return { seeded: false, message: "Database already contains records." };
    }

    console.log("Seeding initial Kindergarten School data...");

    // 1. Classes & Sections
    const classes = await ClassModel.insertMany([
      {
        name: "Play Group",
        nameBn: "প্লে গ্রুপ",
        code: "PLAY",
        level: 0,
        description: "Early childhood development through sensory play and fun interaction.",
        sections: [
          { name: "Rose", capacity: 20, classTeacherName: "Nusrat Jahan" },
          { name: "Tulip", capacity: 20, classTeacherName: "Farzana Haque" },
        ],
      },
      {
        name: "Nursery",
        nameBn: "নার্সারি",
        code: "NUR",
        level: 1,
        description: "Foundational alphabet, numbers, drawing, and interactive games.",
        sections: [
          { name: "Lily", capacity: 25, classTeacherName: "Sabrina Akter" },
          { name: "Sunflower", capacity: 25, classTeacherName: "Mahfuzur Rahman" },
        ],
      },
      {
        name: "KG",
        nameBn: "কেজি (Kindergarten)",
        code: "KG",
        level: 2,
        description: "Bilingual reading readiness, numbers, science discovery, and motor skills.",
        sections: [
          { name: "Jasmine", capacity: 25, classTeacherName: "Farzana Haque" },
          { name: "Lotus", capacity: 25, classTeacherName: "Nusrat Jahan" },
        ],
      },
      {
        name: "Class 1",
        nameBn: "প্রথম শ্রেণি",
        code: "CLS-1",
        level: 3,
        description: "Primary foundation with structured math, languages, and general knowledge.",
        sections: [
          { name: "Marigold", capacity: 30, classTeacherName: "Mahfuzur Rahman" },
        ],
      },
    ]);

    // 2. Teachers
    const teachers = await TeacherModel.insertMany([
      {
        employeeId: "EMP-2026-001",
        name: "Nusrat Jahan",
        nameBn: "নুসরাত জাহান",
        designation: "Senior Kindergarten Educator",
        qualification: "B.Ed, M.A in English (DU), Early Childhood Certified",
        joiningDate: "2023-01-10",
        phone: "+8801711223344",
        email: "nusrat.teacher@bloomkindergarten.edu.bd",
        assignedClasses: ["Play Group", "KG"],
        assignedSubjects: ["English Phonics", "Art & Craft"],
        salary: 45000,
        isClassTeacher: true,
        classTeacherOf: "Play Group - Rose",
        photoUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&auto=format&fit=crop&q=80",
        bio: "Dedicated to creating affectionate and interactive environments where every child discovers joy in learning.",
      },
      {
        employeeId: "EMP-2026-002",
        name: "Farzana Haque",
        nameBn: "ফারজানা হক",
        designation: "Assistant Teacher (Numeracy)",
        qualification: "B.Sc in Mathematics, Montessori Certified",
        joiningDate: "2023-03-15",
        phone: "+8801811334455",
        email: "farzana.teacher@bloomkindergarten.edu.bd",
        assignedClasses: ["Nursery", "KG"],
        assignedSubjects: ["Basic Math", "Storytelling"],
        salary: 40000,
        isClassTeacher: true,
        classTeacherOf: "Nursery - Lily",
        photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
        bio: "Specializes in hands-on math manipulative games and sensory play.",
      },
      {
        employeeId: "EMP-2026-003",
        name: "Mahfuzur Rahman",
        nameBn: "মাহফুজুর রহমান",
        designation: "Physical Education & Activity Coordinator",
        qualification: "B.P.Ed, Certified Child Fitness Coach",
        joiningDate: "2024-01-05",
        phone: "+8801911445566",
        email: "mahfuz.teacher@bloomkindergarten.edu.bd",
        assignedClasses: ["Play Group", "Nursery", "KG", "Class 1"],
        assignedSubjects: ["Physical Education", "Music & Movement"],
        salary: 38000,
        isClassTeacher: false,
        photoUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80",
        bio: "Passionate about encouraging agility, teamwork, and active outdoor play among little ones.",
      },
      {
        employeeId: "EMP-2026-004",
        name: "Sabrina Akter",
        nameBn: "সাবরিনা আক্তার",
        designation: "Language & Phonics Specialist",
        qualification: "M.A in Linguistics (JU), Child Psychology Certified",
        joiningDate: "2024-02-01",
        phone: "+8801611556677",
        email: "sabrina.teacher@bloomkindergarten.edu.bd",
        assignedClasses: ["Nursery", "Class 1"],
        assignedSubjects: ["Bangla Rhymes", "English Phonics"],
        salary: 42000,
        isClassTeacher: true,
        classTeacherOf: "Class 1 - Marigold",
        photoUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
        bio: "Passionate about multilingual storytelling and early speech development.",
      },
    ]);

    // 3. Guardians
    const guardians = await GuardianModel.insertMany([
      {
        name: "Mohammad Rafiqul Islam",
        nameBn: "মোহাম্মদ রফিকুল ইসলাম",
        relation: "Father",
        phone: "+8801712345678",
        email: "rafiqul.parent@gmail.com",
        profession: "Software Engineer",
        address: "House 42, Road 7, Sector 3, Uttara, Dhaka-1230",
        linkedStudentIds: ["KGS-2026-0001"],
      },
      {
        name: "Dr. Nazmul Huda",
        nameBn: "ডাঃ নাজমুল হুদা",
        relation: "Father",
        phone: "+8801812345678",
        email: "dr.nazmul@gmail.com",
        profession: "Physician",
        address: "Apartment 5B, Green Valley, Dhanmondi, Dhaka",
        linkedStudentIds: ["KGS-2026-0002"],
      },
      {
        name: "Sharmin Sultana",
        nameBn: "শারমীন সুলতানা",
        relation: "Mother",
        phone: "+8801912345678",
        email: "sharmin.sultana@yahoo.com",
        profession: "Banker",
        address: "Plot 18, Block B, Bashundhara R/A, Dhaka",
        linkedStudentIds: ["KGS-2026-0003"],
      },
    ]);

    // 4. Students
    const playClass = classes[0];
    const nurseryClass = classes[1];
    const kgClass = classes[2];

    const students = await StudentModel.insertMany([
      {
        studentId: "KGS-2026-0001",
        admissionNo: "ADM-2026-101",
        name: "Rayan Islam",
        nameBn: "রায়ান ইসলাম",
        classId: playClass._id.toString(),
        className: "Play Group",
        sectionId: "Rose",
        sectionName: "Rose",
        rollNo: 1,
        dob: "2023-04-12",
        gender: "Male",
        bloodGroup: "B+",
        address: "House 42, Road 7, Sector 3, Uttara, Dhaka",
        guardianId: guardians[0]._id.toString(),
        guardianName: "Mohammad Rafiqul Islam",
        guardianPhone: "+8801712345678",
        admissionDate: "2026-01-05",
        academicYear: "2026",
        enrollmentStatus: "active",
        emergencyContact: "+8801712345678",
        photoUrl: "https://images.unsplash.com/photo-1595454223600-91fb55979d46?w=400&auto=format&fit=crop&q=80",
        remarks: "Energetic, enthusiastic about colors and clay modelling.",
      },
      {
        studentId: "KGS-2026-0002",
        admissionNo: "ADM-2026-102",
        name: "Anika Tabassum",
        nameBn: "আনিকা তাবাসসুম",
        classId: nurseryClass._id.toString(),
        className: "Nursery",
        sectionId: "Lily",
        sectionName: "Lily",
        rollNo: 2,
        dob: "2022-08-20",
        gender: "Female",
        bloodGroup: "O+",
        address: "Apartment 5B, Dhanmondi, Dhaka",
        guardianId: guardians[1]._id.toString(),
        guardianName: "Dr. Nazmul Huda",
        guardianPhone: "+8801812345678",
        admissionDate: "2026-01-06",
        academicYear: "2026",
        enrollmentStatus: "active",
        emergencyContact: "+8801812345678",
        photoUrl: "https://images.unsplash.com/photo-1543332164-6e82f355badc?w=400&auto=format&fit=crop&q=80",
        remarks: "Loves singing nursery rhymes and painting.",
      },
      {
        studentId: "KGS-2026-0003",
        admissionNo: "ADM-2026-103",
        name: "Zayan Chowdhury",
        nameBn: "জায়ান চৌধুরী",
        classId: kgClass._id.toString(),
        className: "KG",
        sectionId: "Jasmine",
        sectionName: "Jasmine",
        rollNo: 3,
        dob: "2021-11-15",
        gender: "Male",
        bloodGroup: "A+",
        address: "Plot 18, Block B, Bashundhara R/A, Dhaka",
        guardianId: guardians[2]._id.toString(),
        guardianName: "Sharmin Sultana",
        guardianPhone: "+8801912345678",
        admissionDate: "2026-01-07",
        academicYear: "2026",
        enrollmentStatus: "active",
        emergencyContact: "+8801912345678",
        photoUrl: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&auto=format&fit=crop&q=80",
        remarks: "Exhibits excellent curiosity and polite mannerisms.",
      },
      {
        studentId: "KGS-2026-0004",
        admissionNo: "ADM-2026-104",
        name: "Samira Hasan",
        nameBn: "সামিরা হাসান",
        classId: playClass._id.toString(),
        className: "Play Group",
        sectionId: "Rose",
        sectionName: "Rose",
        rollNo: 2,
        dob: "2023-06-18",
        gender: "Female",
        bloodGroup: "AB+",
        address: "House 12, Road 4, Banani, Dhaka",
        guardianId: guardians[0]._id.toString(),
        guardianName: "Hasan Mahmud",
        guardianPhone: "+8801799887766",
        admissionDate: "2026-01-08",
        academicYear: "2026",
        enrollmentStatus: "active",
        emergencyContact: "+8801799887766",
        photoUrl: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&auto=format&fit=crop&q=80",
        remarks: "Gentle and cooperative with classmates.",
      },
    ]);

    // 5. Today's Attendance
    const today = new Date().toISOString().split("T")[0];
    await AttendanceModel.insertMany([
      {
        targetType: "student",
        targetId: students[0].studentId,
        studentName: students[0].name,
        classId: students[0].classId,
        sectionId: students[0].sectionId,
        date: today,
        status: "present",
        recordedBy: "Nusrat Jahan",
      },
      {
        targetType: "student",
        targetId: students[1].studentId,
        studentName: students[1].name,
        classId: students[1].classId,
        sectionId: students[1].sectionId,
        date: today,
        status: "present",
        recordedBy: "Sabrina Akter",
      },
      {
        targetType: "student",
        targetId: students[2].studentId,
        studentName: students[2].name,
        classId: students[2].classId,
        sectionId: students[2].sectionId,
        date: today,
        status: "late",
        remarks: "Traffic delay on airport road",
        recordedBy: "Farzana Haque",
      },
      {
        targetType: "student",
        targetId: students[3].studentId,
        studentName: students[3].name,
        classId: students[3].classId,
        sectionId: students[3].sectionId,
        date: today,
        status: "present",
        recordedBy: "Nusrat Jahan",
      },
    ]);

    // 6. Fee Structures
    await FeeStructureModel.insertMany([
      {
        academicYear: "2026",
        classId: playClass._id.toString(),
        className: "Play Group",
        feeType: "Tuition",
        amount: 4500,
        frequency: "monthly",
      },
      {
        academicYear: "2026",
        classId: nurseryClass._id.toString(),
        className: "Nursery",
        feeType: "Tuition",
        amount: 5000,
        frequency: "monthly",
      },
      {
        academicYear: "2026",
        classId: kgClass._id.toString(),
        className: "KG",
        feeType: "Tuition",
        amount: 5500,
        frequency: "monthly",
      },
      {
        academicYear: "2026",
        classId: playClass._id.toString(),
        className: "Play Group",
        feeType: "Admission",
        amount: 15000,
        frequency: "one_time",
      },
    ]);

    // 7. Fee Invoices
    await FeeInvoiceModel.insertMany([
      {
        invoiceNo: "INV-2026-0001",
        studentId: students[0].studentId,
        studentName: students[0].name,
        classId: students[0].classId,
        className: students[0].className,
        month: "October 2026",
        academicYear: "2026",
        dueDate: "2026-10-15",
        items: [
          { feeType: "Monthly Tuition Fee", amount: 4500 },
          { feeType: "Creative Activity & Snacks", amount: 1200 },
        ],
        totalAmount: 5700,
        discount: 200,
        payableAmount: 5500,
        paidAmount: 5500,
        balance: 0,
        status: "paid",
      },
      {
        invoiceNo: "INV-2026-0002",
        studentId: students[1].studentId,
        studentName: students[1].name,
        classId: students[1].classId,
        className: students[1].className,
        month: "October 2026",
        academicYear: "2026",
        dueDate: "2026-10-15",
        items: [
          { feeType: "Monthly Tuition Fee", amount: 5000 },
          { feeType: "Air-Conditioned Transport", amount: 2500 },
        ],
        totalAmount: 7500,
        discount: 0,
        payableAmount: 7500,
        paidAmount: 4000,
        balance: 3500,
        status: "partial",
      },
      {
        invoiceNo: "INV-2026-0003",
        studentId: students[2].studentId,
        studentName: students[2].name,
        classId: students[2].classId,
        className: students[2].className,
        month: "October 2026",
        academicYear: "2026",
        dueDate: "2026-10-15",
        items: [
          { feeType: "Monthly Tuition Fee", amount: 5500 },
          { feeType: "Science Discovery Kit", amount: 1500 },
        ],
        totalAmount: 7000,
        discount: 0,
        payableAmount: 7000,
        paidAmount: 0,
        balance: 7000,
        status: "unpaid",
      },
    ]);

    // 8. Notices
    await NoticeModel.insertMany([
      {
        title: "Upcoming Autumn Joy Fest & Color Day",
        titleBn: "আসন্ন শরৎ আনন্দ উৎসব ও কালার ডে উদযাপন",
        content: "Dear Parents, we are excited to celebrate Color Day next Thursday! Please have your little ones wear their favorite colorful outfits.",
        contentBn: "সম্মানিত অভিভাবকবৃন্দ, আগামী বৃহস্পতিবার আমাদের ক্যাম্পাসে অনুষ্ঠিত হবে 'কালার ডে'। শিশুদের রঙিন পোশাকে সাজিয়ে পাঠাতে অনুরোধ করা হলো।",
        audience: "all",
        priority: "important",
        publishedDate: "2026-10-04",
        isActive: true,
        authorName: "Principal's Office",
      },
      {
        title: "Monthly Parent-Teacher Alignment Conference (PTC)",
        titleBn: "মাসিক অভিভাবক ও শিক্ষক মতবিনিময় সভা (পিটিসি)",
        content: "PTC sessions are scheduled for Saturday from 9:30 AM to 1:00 PM. Please check your individual time slots in the parent portal.",
        contentBn: "আগামী শনিবার সকাল ৯:৩০ থেকে দুপুর ১:০০ টা পর্যন্ত অভিভাবক ও শিক্ষক মতবিনিময় সভা অনুষ্ঠিত হবে। পেরেন্ট পোর্টালে সময়সূচি দেখে নিন।",
        audience: "parents",
        priority: "normal",
        publishedDate: "2026-10-02",
        isActive: true,
        authorName: "Academic Coordinator",
      },
      {
        title: "Admissions Open for Academic Session 2026-2027",
        titleBn: "২০২৬-২০২৭ শিক্ষাবর্ষে প্লে, নার্সারি ও কেজি শ্রেণিতে ভর্তি চলছে",
        content: "Online applications are now open for prospective toddlers. Limited seats per section to maintain our high mentor-child ratio.",
        contentBn: "২০২৬ শিক্ষাবর্ষের প্লে গ্রুপ, নার্সারি এবং কেজিতে সীমিত আসনে অনলাইন ভর্তি আবেদন শুরু হয়েছে। আজই আবেদন সম্পন্ন করুন।",
        audience: "public",
        priority: "urgent",
        publishedDate: "2026-09-28",
        isActive: true,
        authorName: "Admission Desk",
      },
    ]);

    // 9. Events
    await EventModel.insertMany([
      {
        title: "Annual Little Champions Sports Meet",
        titleBn: "বার্ষিক ক্ষুদে চ্যাম্পিয়ন ক্রীড়া প্রতিযোগিতা",
        description: "A joyful day of toddler races, sensory obstacle fun, and family games at the campus playground.",
        descriptionBn: "দৌড়, ব্যালেন্সিং গেম এবং অভিভাবকদের আনন্দদায়ক প্রতিযোগিতায় মুখরিত বার্ষিক ক্রীড়া উৎসব।",
        date: "2026-11-14",
        time: "09:00 AM - 02:00 PM",
        venue: "School Main Green Grounds",
        coverImage: "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?w=600&auto=format&fit=crop&q=80",
        category: "Sports",
        isPublic: true,
      },
      {
        title: "Young Explorers Science & Art Fair",
        titleBn: "ক্ষুদে বিজ্ঞানী ও চিত্রাঙ্কন মেলা",
        description: "Interactive science volcano experiments, clay pottery show, and watercolors created by our little learners.",
        descriptionBn: "শিশুদের তৈরি রঙিন চিত্রকর্ম, মাটির ভাস্কর্য এবং সহজ বিজ্ঞানের মজার পরীক্ষা প্রদর্শনী।",
        date: "2026-12-05",
        time: "10:00 AM - 04:00 PM",
        venue: "Auditorium & Art Studio",
        coverImage: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=600&auto=format&fit=crop&q=80",
        category: "Cultural",
        isPublic: true,
      },
    ]);

    // 10. Sample Online Admission Applications
    await AdmissionModel.insertMany([
      {
        applicationNo: "ADM-2026-001",
        appliedClass: "Play Group",
        session: "2026",
        childName: "Tahmid Rahman",
        childNameBn: "তাহমিদ রহমান",
        dob: "2023-05-14",
        gender: "Male",
        bloodGroup: "O+",
        fatherName: "Motiur Rahman",
        fatherPhone: "+8801755123456",
        fatherOccupation: "Chartered Accountant",
        motherName: "Sumona Akter",
        motherPhone: "+8801755123457",
        motherOccupation: "Teacher",
        presentAddress: "House 28, Sector 4, Uttara, Dhaka",
        email: "motiur.rahman@gmail.com",
        status: "under_review",
        reviewNotes: "Documents verified. Scheduled for campus interaction.",
        submittedAt: "2026-10-05T14:30:00Z",
      },
      {
        applicationNo: "ADM-2026-002",
        appliedClass: "Nursery",
        session: "2026",
        childName: "Mehvish Alam",
        childNameBn: "মেহবিশ আলম",
        dob: "2022-09-02",
        gender: "Female",
        bloodGroup: "B+",
        fatherName: "Jahangir Alam",
        fatherPhone: "+8801833123456",
        fatherOccupation: "Business",
        motherName: "Farzana Parveen",
        motherPhone: "+8801833123457",
        presentAddress: "Gulshan-2, Dhaka",
        email: "jahangir.alam@corporate.com",
        status: "approved",
        reviewNotes: "Approved by Principal. Ready for enrollment fee invoice.",
        submittedAt: "2026-10-03T10:15:00Z",
      },
    ]);

    // 11. CMS Content
    await CMSContentModel.create({
      section: "school_info",
      data: {
        schoolName: "Bloom Kindergarten & Junior Academy",
        schoolNameBn: "ব্লুম কিন্ডারগার্টেন অ্যান্ড জুনিয়র একাডেমি",
        phone: "+880 1711-223344, +880 1811-556677",
        email: "info@bloomkindergarten.edu.bd",
        address: "Plot 14, Road 11, Sector 4, Uttara Model Town, Dhaka-1230",
        addressBn: "প্লট ১৪, রোড ১১, সেক্টর ৪, উত্তরা মডেল টাউন, ঢাকা-১২৩০",
        facebookUrl: "https://facebook.com/bloomkindergarten",
        youtubeUrl: "https://youtube.com/@bloomkindergarten",
        emergencyHelpline: "+880 1911-001122",
      },
    });

    console.log("Database seeded successfully!");
    return { seeded: true, message: "Database seeded successfully!" };
  } catch (error: any) {
    console.error("Seeding error:", error);
    return { seeded: false, error: error.message };
  }
}
