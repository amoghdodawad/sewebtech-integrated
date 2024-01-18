const express = require('express');
const { connectToDB } = require('./db/db.js');
const cors = require('cors');
const bodyParser = require('body-parser');
const { userRouter } = require('./routes/auth.routes.js');
const path = require('path');
const mongoose = require('mongoose');
const workshopRoutes = require('./routes/workshopRoutes');
const { Users } = require('./models/models.js');
const {
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
} = require('./structure');

const tables = {
    'Users': Users,
    'Faculty': Faculty,
    'WorkExperience': WorkExperience,
    'Courses': Courses,
    'PhDDetails': PhDDetails,
    'ResearchStudents': ResearchStudents,
    'FacultyPhDResearchStudents': FacultyPhDResearchStudents,
    'Books': Books,
    'BooksPublished': BooksPublished,
    'Conferences': Conferences,
    'Memberships': Memberships,
    'Committees': Committees,
    'AttendedWorkshops': AttendedWorkshops,
    'ConductedWorkshops': ConductedWorkshops,
    'FundedProjects': FundedProjects,
    'TrainingDevelopment': TrainingDevelopment,
    'Interests': Interests,
    'OtherInformation': OtherInformation
}

const successResponse = { "status": "success" };
const failureResponse = { "status": "fail" };
const notFoundResponse = { "status": "not found" };

const app = express();

const PORT = 8080;

app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});
app.use('/api/auth', userRouter);
app.use('/', express.static('build'));
app.use('/workshops', workshopRoutes);

for (let modelName in tables) {
    let routeName = modelName.toLowerCase();

    app.put(`/update/${routeName}/:keys/:values`, async (req, res) => {
        try {
            const keys = req.params.keys.split(',');
            const values = req.params.values.split(',');
            //console.log(req.body)

            if (keys.length !== values.length) {
                return res.status(400).send({ "error": "Number of keys and values should match" });
            }

            let query = {};
            keys.forEach((key, index) => {
                query[key] = values[index];
            });

            //console.log(query);

            const updatedData = await tables[modelName].findOneAndUpdate(query, req.body);
            //console.log(updatedData)
            if (!updatedData) {
                return res.status(404).send(notFoundResponse);
            }
            res.send(successResponse);
        } catch (error) {
            const err = failureResponse;
            err.reason = error;
            res.status(500).send(err);
        }
    });

    app.delete(`/delete/${routeName}/:keys/:values`, async (req, res) => {
        try {
            const keys = req.params.keys.split(',');
            const values = req.params.values.split(',');

            if (keys.length !== values.length) {
                return res.status(400).send({ "error": "Number of keys and values should match" });
            }

            let query = {};
            keys.forEach((key, index) => {
                query[key] = values[index];
            });

            const deletedData = await tables[modelName].deleteOne(query);
            if (!deletedData.deletedCount) {
                return res.status(404).send(notFoundResponse);
            }
            res.send(successResponse);
        } catch (error) {
            const err = failureResponse;
            err.reason = error;
            res.status(500).send(err);
        }
    });

    app.get(`/fetch/${routeName}`, async (req, res) => {
        try {
            const allData = await tables[modelName].find({}, { password: 0 });
            //console.log(allData);
            res.json(allData);
        } catch (error) {
            const err = failureResponse;
            err.reason = error;
            res.status(500).send(err);
        }
    });

    app.get(`/fetch/${routeName}/:keys/:values`, async (req, res) => {
        try {
            const keys = req.params.keys.split(',');
            const values = req.params.values.split(',');
            // console.log(keys);
            // console.log(values);
            if (keys.length !== values.length) {
                return res.status(400).send({ "error": "Number of keys and values should match" });
            }

            let query = {};
            keys.forEach((key, index) => {
                query[key] = values[index];
            });

            const filteredData = await tables[modelName].find(query, { password: 0 });
            // console.log('Filtered data');
            // console.log(filteredData);
            res.json(filteredData);
        } catch (error) {
            console.log(error);
            const err = failureResponse;
            err.reason = error;
            res.status(500).send(err);
        }
    });

    app.post(`/insert/${routeName}`, async (req, res) => {
        try {
            //console.log(req.body)
            const newData = new tables[modelName](req.body);
            //console.log(newData)
            await newData.save();
            res.send(successResponse);
        } catch (error) {
            const err = failureResponse;
            err.reason = error;
            res.status(500).send(err);
        }
    });
}
// Define the Course schema
const courseSchema = new mongoose.Schema({
    fId: {
        type: Number,
        default: 13,
    },
    email : String,
    courseName: String,
    howManyTimes: Number,
    courseCode: String,

});

// Create the Course model
const Course = mongoose.model('courses', courseSchema);

// Route to add courses
app.post('/api/addCourse', async (req, res) => {
    try {
        const courses = req.body.courses;
        const email = req.body.email;
        console.log(req.body);

        // Validate input (you can add more validation as needed)
        if (courses.every(course => {
            course.email = email;
            return course.courseName && course.howManyTimes && course.courseCode
        })) {
            // Save courses to MongoDB
            console.log(courses);
            const savedCourses = await Course.create(courses);

            res.json({ success: true, data: savedCourses });
        } else {
            res.json({ success: false, message: 'Please fill in all fields.' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.json({ success: false, message: 'An unexpected error occurred.' });
    }
});

app.put('/api/updateCourse/:id/:code/:email', async (req, res) => {
    const { id, code, email } = req.params;
    const { uname, uhmt, ucode } = req.body;
    console.log(uname, uhmt, ucode)

    try {
        // Split the concatenated identifier to get id and courseCode
        console.log(id, code)

        // Find and update the course based on id and courseCode
        const updatedCourse = await Course.findOneAndUpdate(
            { fId: id, courseCode: code, email },
            { courseName: uname, howManyTimes: uhmt, courseCode: ucode },
            { new: true }
        );

        res.json({ success: true, data: updatedCourse });
    } catch (error) {
        console.error('Error updating course:', error);
        res.json({ success: false, message: 'An unexpected error occurred.' });
    }
});

app.post('/api/deleteCourse/:id/:code/:email', async (req, res) => {
    const id = parseInt(req.params.id);
    const code = req.params.code;
    const email = req.params.email;

    // Find the index of the course in the array
    try {
        // Use async/await to make the code more readable
        const result = await Course.deleteOne({ fId: id, courseCode: code, email });

        // Check the result
        if (result.deletedCount > 0) {
            res.json({ success: true, data: "deleted" });
        } else {
            res.status(404).json({ success: false, message: 'Course not found.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }

});

app.get('/api/getCourses/:email', async (req, res) => {
    const userFId = 13;
    const email = req.params.email;
    Course.find({ email })
        .then(courses => res.json(courses))
        .catch(err => res.json(err))
});

app.get('/api/details/:fId/:email', (req, res) => {
    const userfId = req.params.fId;
    const email = req.params.email;

    // Check if fId exists in mock data
    Course.find({ courseName: userfId, email })
        .then(courses => res.json(courses))
        .catch(err => res.json(err))
});

const ConferenceSchema = new mongoose.Schema({
    emailId: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    details_of_conferences: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    Awards: {
        type: String,
    },
});

const Conference = mongoose.model('Conference', ConferenceSchema);
async function updateConferenceById(id, updatedData) {
    try {
        const updatedConference = await Conference.findByIdAndUpdate(
            id,
            { $set: updatedData },
            { new: true }
        );

        return updatedConference;
    } catch (error) {
        throw error;
    }
}

async function deleteConferenceById(id) {
    try {
        console.log('Deleting conference with ID:', id);

        const deletedConference = await Conference.findOneAndDelete({id:id});
        console.log('Deleted conference:', deletedConference);

        return deletedConference;
    } catch (error) {
        console.error('Error deleting data:', error);
        throw error;
    }
}
app.post('/test', async function (req, res) {
    const { id, title, details_of_conferences, year, Awards, email } = req.body;
    const emailId = email;

    const newConference = new Conference({
        emailId,
        id,
        title,
        details_of_conferences,
        year,
        Awards,
    });

    try {
        await newConference.save();
        console.log('Conference saved successfully');
        res.status(201).json({
            message: 'Conference created successfully',
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Internal Server Error',
        });
    }
});

app.post('/test2', async function (req, res) {
    const emailId = req.body.email;
    // console.log(req.body);

    try {
        const response = await Conference.find({ emailId });
        res.json(response);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/search', async function (req, res) {
    const { query } = req.query;

    try {
        const response = await Conference.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { details_of_conferences: { $regex: query, $options: 'i' } },
                { year: { $regex: query, $options: 'i' } },
                { Awards: { $regex: query, $options: 'i' } },
            ],
        });
        res.json(response);
    } catch (error) {
        console.error('Error searching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/delete/:id', async function (req, res) {
    const id = req.params.id;
    console.log(id);
    try {
        const deletedConference = await deleteConferenceById(id);
        if (!deletedConference) {
            return res.status(404).json({ message: 'Conference not found' });
        }
        console.log('Conference deleted successfully');
        res.sendStatus(204);
    } catch (error) {
        console.error('Error deleting data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.put('/update/:id', async function (req, res) {
    const id = req.params.id;
    const updatedData = req.body; // Assuming the updated data is sent in the request body

    try {
        const updatedConference = await updateConferenceById(id, updatedData);
        if (!updatedConference) {
            return res.status(404).json({ message: 'Conference not found' });
        }
        console.log('Conference updated successfully');
        res.status(200).json({
            message: 'Conference updated successfully',
            updatedConference,
        });
    } catch (error) {
        console.error('Error updating data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const phdSchema = new mongoose.Schema({
    email : String,
    Nameofresearch: String,
    Topic: String,
    date: String,
    Nameofguide: String,
    Status: String,
  });
  
const PhdModel = mongoose.model('Phddetails', phdSchema);

app.post('/t9', async (req, res) => {
    try {
      const phdData = req.body;
    //   console.log(phdData);
      const newPhd = new PhdModel(phdData);
      await newPhd.save();
      res.status(201).json({ message: 'PhD data added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
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
  
  const faculties = mongoose.model('faculties', facultySchema);
  
  app.get('/faculties/:email', async (req, res) => {
    try {
      const faculty = await faculties.findOne({ email: req.params.email });
      if (faculty) {
        res.json(faculty);
      } else {
        res.status(404).json({ message: 'Faculty not found' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  app.post('/add/:email', async (req, res) => {
    try {
      // Get email from URL parameters
      const email = req.params.email || 'default@email.com';
  
      // Check if the user already exists
      const existingUser = await faculties.findOne({ email });
  
      if (existingUser) {
        res.json({ message: 'User already exists', user: existingUser });
        return;
      }
  
      // Get name from the request body or use a default value
      const name = req.body.name || 'Default';
  
      // Create a new user with the provided or default values
      const newUser = new faculties({
        name,
        email,
        designation: '',
        qualification: '',
        area_of_specialization: '',
        address: '',
        resi_contact_no: '',
        mobile_no: '',
        dob: null,
        AcademicPerformance: [],
      });
  
      // Save the new user to the database
      await newUser.save();
  
      res.json({ message: 'New user added successfully', user: newUser });
    } catch (error) {
      // Check if the error is a duplicate key error
      if (error.code === 11000) {
        res.status(400).json({ message: 'Email already exists' });
      } else {
        console.error('Error adding new user:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  });
  
  
  // ... (existing code)
  
  app.post('/update/:email', async (req, res) => {
      try {
        const { name, designation, qualification, area_of_specialization, address, resi_contact_no, mobile_no, dob } = req.body;
    
        const updatedData = {
          name,
          designation,
          qualification,
          area_of_specialization,
          address,
          resi_contact_no,
          mobile_no,
          dob,
        };
    
        const updatedFaculty = await faculties.findOneAndUpdate(
          { email: req.params.email },
          { $set: updatedData },
          { new: true }
        );
    
        if (updatedFaculty) {
          res.json({ message: 'User details updated successfully', user: updatedFaculty });
        } else {
          res.status(404).json({ message: 'Faculty not found' });
        }
      } catch (error) {
        console.error('Error updating user details:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    });

app.use((req, res, next) => {
    if (/(.ico|.js|.css|.jpg|.png|.map)$/i.test(req.path)) {
        next();
    } else {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    }
});

(async () => {
    await connectToDB("mongodb+srv://kletech:kletech1234@kledatabase.t7xh5su.mongodb.net/mydb?retryWrites=true&w=majority");
    console.log('Connected to DB');
})();

app.listen(PORT, 'localhost', function () {
    console.log(`Server is running on port ${PORT}`);
});