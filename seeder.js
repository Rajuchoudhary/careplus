const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

//Load End Variables
dotenv.config({ path: './config/config.env' });

//Load Models
const Doctor = require('./models/Doctor');
const Patient = require('./models/Patient');

//Connect
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

//Read json files
const doctors = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/doctors.json`, 'utf-8')
);

const patients = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/patients.json`, 'utf-8')
);

//Import into DB
const importData = async () => {
  try {
    await Doctor.create(doctors);
    await Patient.create(patients);
    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

//Delete data
const deleteData = async () => {
  try {
    await Doctor.deleteMany();
    await Patient.deleteMany();
    console.log('Data Destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
