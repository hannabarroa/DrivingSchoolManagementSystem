
import { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
/*
const ReservationForm = () => {
  const [menuItems, setMenuItems] = useState([]);
  
  const [selectedItemsContainer, setSelectedItemsContainer] = useState([]);

  useEffect(() => {
    // Fetch menu items from MySQL database using Axios
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/menu');
        setMenuItems(response.data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };
  
    fetchMenuItems();
  }, []);
  

  const initialValues = {
    name: '',
    email: '',
    contact: '',
    selectedMenuItems: [],
    eventType: '',
    date: '',
    eventTime:'',
    venue: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    contact: Yup.string().required('Required'),
    selectedMenuItems: Yup.array().required('Select at least one menu item'),
    eventType: Yup.string().required('Required'),
    date: Yup.date().required('Required'),
    eventTime:Yup.string().required('Required'),
    venue:Yup.string().required('Required'),
  });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
      try {
        // Make a POST request to save the reservation data
        const response = await axios.post('http://localhost:8081/Customers_Order', {
          name: values.name,
          email: values.email,
          contact: values.contact,
          venue: values.venue,
          selectedMenuItems: values.selectedMenuItems.join(', '),
          eventType: values.eventType,
          date: values.date,
          eventTime: values.eventTime,
        });

        console.log(response.data); // Assuming the server returns some response, you can log it for debugging

        // Update the selected items container
        setSelectedItemsContainer(values.selectedMenuItems);

        // Reset the form after successful submission
        setSubmitting(false);
        resetForm();
      } catch (error) {
        console.error('Error submitting reservation:', error);
        console.log('Reservation not saved!');
        // Handle errors or display an error message to the user
        // You might want to update the UI to inform the user about the error
      }
    };


    



  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      <Form>
        <div>
          <label htmlFor="name">Name</label>
          <Field type="text" id="name" name="name" />
          <ErrorMessage name="name" component="div" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <Field type="text" id="email" name="email" />
          <ErrorMessage name="email" component="div" />
        </div>
        <div>
          <label htmlFor="contact">Contact</label>
          <Field type="text" id="contact" name="contact" />
          <ErrorMessage name="contact" component="div" />
        </div>

        <div>
        <label htmlFor="venue">Venue</label>
        <Field type="text" id="venue" name="venue" />
        <ErrorMessage name="venue" component="div" />
        </div>


        <div>
          <label htmlFor="selectedMenuItems">Menu Items</label>
          <Field as="select" multiple name="selectedMenuItems">
            {menuItems.map(item => (
              <option key={item.Food} value={item.Food}>
                {item.Food}
              </option>
            ))}
          </Field>
          <ErrorMessage name="selectedMenuItems" component="div" />
        </div>




        <div>
          <label htmlFor="eventType">Event Type</label>
          <Field as="select" id="eventType" name="eventType">
            <option value="">Select Event Type</option>
            <option value="wedding">Wedding</option>
            <option value="birthday">Birthday</option>
            <option value="homecoming">Homecoming</option>

          </Field>
          <ErrorMessage name="eventType" component="div" />
        </div>
       





        <div>
          <label htmlFor="date">Date</label>
          <Field type="date" id="date" name="date" />
          <ErrorMessage name="date" component="div" />
        </div>

        <div>
        <label htmlFor="eventTime">Event Time</label>
        <Field type="time" id="eventTime" name="eventTime" />
        <ErrorMessage name="eventTime" component="div" />
        </div>
        
        <div className="selected-items-container">
          <p>Selected Items:</p>
          <ul>
            {selectedItemsContainer.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>



        <div>
          <button type="submit">Place Reservation</button>
        </div>
      </Form>
    </Formik>
  );
};

export default ReservationForm;
*/const DrivingSchoolManagement = () => {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Fetch courses and students data
    const fetchCourses = async () => {
      try {
        const coursesResponse = await axios.get('http://localhost:8081/api/courses');
        setCourses(coursesResponse.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    const fetchStudents = async () => {
      try {
        const studentsResponse = await axios.get('http://localhost:8081/api/students');
        setStudents(studentsResponse.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchCourses();
    fetchStudents();
  }, []);

  const initialValues = {
    studentName: '',
    studentEmail: '',
    selectedCourse: '',
  };

  const validationSchema = Yup.object({
    studentName: Yup.string().required('Required'),
    studentEmail: Yup.string().email('Invalid email address').required('Required'),
    selectedCourse: Yup.string().required('Select a course'),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Make a POST request to enroll student in the selected course
      const response = await axios.post('http://localhost:8081/enrollments', {
        studentName: values.studentName,
        studentEmail: values.studentEmail,
        courseId: values.selectedCourse,
      });

      console.log(response.data); // Log response for debugging

      // Reset the form after successful submission
      setSubmitting(false);
      resetForm();
    } catch (error) {
      console.error('Error enrolling student:', error);
      // Handle errors or display an error message to the user
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // Additional logic to fetch students for the selected date can be added here
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <h1>Driving School Management</h1>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        <Form>
          <div>
            <label htmlFor="studentName">Student Name</label>
            <Field type="text" id="studentName" name="studentName" />
            <ErrorMessage name="studentName" component="div" />
          </div>
          <div>
            <label htmlFor="studentEmail">Student Email</label>
            <Field type="text" id="studentEmail" name="studentEmail" />
            <ErrorMessage name="studentEmail" component="div" />
          </div>
          <div>
            <label htmlFor="selectedCourse">Select Course</label>
            <Field as="select" id="selectedCourse" name="selectedCourse">
              <option value="">Select a course</option>
              {courses.map(course => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </Field>
            <ErrorMessage name="selectedCourse" component="div" />
          </div>
          <div>
            <button type="submit">Enroll</button>
          </div>
        </Form>
      </Formik>

      <div>
        <h2>Scheduling Calendar</h2>
        <Calendar onChange={handleDateChange} value={selectedDate} />
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>Students Reserved for {selectedDate.toDateString()}</h2>
            <ul>
              {students.map((student) => (
                <li key={student.id}>{student.name}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default DrivingSchoolManagement;
