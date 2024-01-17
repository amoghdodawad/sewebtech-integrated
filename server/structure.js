const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
});

const facultySchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    designation: String,
    qualification: String,
    area_of_specialization: String,
    address: String,
    resi_contact_no: String,
    mobile_no: String,
    dob: Date,
    AcademicPerformance: [{
        course: String,
        board_university: String,
        year_of_passing: Number,
        class_obtained: String,
    }],
});

const workExperienceSchema = new mongoose.Schema({
    email: { type: String, ref: 'email' },
    institute_name: String,
    experience_type: String,
    from_to: String,
    designation: String,
    total_years: Number,
});

const CourseSchema = new mongoose.Schema({
    email: { type: mongoose.Schema.Types.ObjectId, ref: 'email' },
    course_title: String,
    times_taught: Number,
    course_code: String,
});

const phdDetailsSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    email: { type: mongoose.Schema.Types.ObjectId, ref: 'email' },
    research_centre: String,
    topic_area: String,
    registration_date: Date,
    part_time_full_time: String,
    guide_name: String,
    work_status: String,
});

const researchStudentsSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    student_name: String,
});

const facultyPhDResearchStudentsSchema = new mongoose.Schema({
    email: { type: mongoose.Schema.Types.ObjectId, ref: 'email' },
    phd_id: { type: mongoose.Schema.Types.ObjectId, ref: 'PhDDetails', primary_key: true },
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ResearchStudents', primary_key: true },
});

const booksSchema = new mongoose.Schema({
    book_id: { type: Number, unique: true },
    title: String,
    year: String,
    remarks: String,
});

const booksPublishedSchema = new mongoose.Schema({
    book_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Books', primary_key: true },
    author_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', primary_key: true },
});

const conferencesSchema = new mongoose.Schema({
    email: { type: mongoose.Schema.Types.ObjectId, ref: 'email' },
    paper_title: { type: mongoose.Schema.Types.ObjectId, ref: 'PaperPublications', primary_key: true },
    journal_conference_details: String,
    type: String,
    remarks_awards: String,
});

const membershipsSchema = new mongoose.Schema({
    email: { type: mongoose.Schema.Types.ObjectId, ref: 'email' },
    organization_name: String,
    membership_type: String,
});

const committeesSchema = new mongoose.Schema({
    email: { type: mongoose.Schema.Types.ObjectId, ref: 'email' },
    committee_name: String,
    capacity: String,
    from: Date,
    to: Date,
});

const attendedWorkshopsSchema = new mongoose.Schema({
    email: { type: mongoose.Schema.Types.ObjectId, ref: 'email' },
    workshop_details: String,
    start_date: Date,
    end_date: Date,
    place: String,
    remarks_awards: String,
});

const conductedWorkshopsSchema = new mongoose.Schema({
    email: { type: mongoose.Schema.Types.ObjectId, ref: 'email' },
    workshop_details: String,
    start_date: Date,
    end_date: Date,
});

const fundedProjectsSchema = new mongoose.Schema({
    email: { type: mongoose.Schema.Types.ObjectId, ref: 'email' },
    project_title: String,
    funding_agency: String,
    amount: Number,
    start_date: Date,
    end_date: Date,
    status: String,
});

const trainingDevelopmentSchema = new mongoose.Schema({
    email: { type: mongoose.Schema.Types.ObjectId, ref: 'email' },
    training_areas: String,
    duration_days: Number,
});

const interestsSchema = new mongoose.Schema({
    email: { type: mongoose.Schema.Types.ObjectId, ref: 'email' },
    interest_areas: String,
});

const otherInformationSchema = new mongoose.Schema({
    email: { type: mongoose.Schema.Types.ObjectId, ref: 'email' },
    additional_info: String,
});

userSchema.plugin(uniqueValidator);
facultySchema.plugin(uniqueValidator);
workExperienceSchema.plugin(uniqueValidator);
CourseSchema.plugin(uniqueValidator);
phdDetailsSchema.plugin(uniqueValidator);
researchStudentsSchema.plugin(uniqueValidator);
facultyPhDResearchStudentsSchema.plugin(uniqueValidator);
booksSchema.plugin(uniqueValidator);
booksPublishedSchema.plugin(uniqueValidator);
conferencesSchema.plugin(uniqueValidator);
membershipsSchema.plugin(uniqueValidator);
committeesSchema.plugin(uniqueValidator);
attendedWorkshopsSchema.plugin(uniqueValidator);
conductedWorkshopsSchema.plugin(uniqueValidator);
fundedProjectsSchema.plugin(uniqueValidator);
trainingDevelopmentSchema.plugin(uniqueValidator);
interestsSchema.plugin(uniqueValidator);
otherInformationSchema.plugin(uniqueValidator);

const Users = mongoose.model('Users', userSchema);
const Faculty = mongoose.model('Faculty', facultySchema);
const WorkExperience = mongoose.model('WorkExperience', workExperienceSchema);
const Courses = mongoose.model('Courses', CourseSchema);
const PhDDetails = mongoose.model('PhDDetails', phdDetailsSchema);
const ResearchStudents = mongoose.model('ResearchStudents', researchStudentsSchema);
const FacultyPhDResearchStudents = mongoose.model('FacultyPhDResearchStudents', facultyPhDResearchStudentsSchema);
const Books = mongoose.model('Books', booksSchema);
const BooksPublished = mongoose.model('BooksPublished', booksPublishedSchema);
const Conferences = mongoose.model('Conferences', conferencesSchema);
const Memberships = mongoose.model('Memberships', membershipsSchema);
const Committees = mongoose.model('Committees', committeesSchema);
const AttendedWorkshops = mongoose.model('AttendedWorkshops', attendedWorkshopsSchema);
const ConductedWorkshops = mongoose.model('ConductedWorkshops', conductedWorkshopsSchema);
const FundedProjects = mongoose.model('FundedProjects', fundedProjectsSchema);
const TrainingDevelopment = mongoose.model('TrainingDevelopment', trainingDevelopmentSchema);
const Interests = mongoose.model('Interests', interestsSchema);
const OtherInformation = mongoose.model('OtherInformation', otherInformationSchema);

module.exports = {
    Users,
    Faculty,
    WorkExperience,
    Courses,
    PhDDetails,
    ResearchStudents,
    FacultyPhDResearchStudents,
    Books,
    BooksPublished,
    Conferences,
    Memberships,
    Committees,
    AttendedWorkshops,
    ConductedWorkshops,
    FundedProjects,
    TrainingDevelopment,
    Interests,
    OtherInformation,
};