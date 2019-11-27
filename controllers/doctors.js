const Doctor = require('../models/Doctor');

//@desc         Get All Doctors
//@route        GET /api/v1/bootcamps
//@access       Public
exports.getDoctors = async (req, res, next) => {
  try {
    const doctors = await Doctor.find();
    res
      .status(200)
      .json({ success: true, count: doctors.length, data: doctors });
  } catch (err) {
    res.status(400).json({
      success: false
    });
  }
};

//@desc         Get Single Doctors
//@route        GET /api/v1/bootcamps/:id
//@access       Public
exports.getDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: doctor });
  } catch (err) {
    res.status(400).json({
      success: false
    });
  }
};

//@desc         Register new Doctor
//@route        POST /api/v1/bootcamps/
//@access       Public
exports.registerDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.create(req.body);

    res.status(201).json({
      success: true,
      data: doctor
    });
  } catch (err) {
    res.status(400).json({
      success: false
    });
  }
};

//@desc         Update Doctor Profile
//@route        PUT /api/v1/bootcamps/:id
//@access       Private
exports.updateDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!doctor) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: doctor });
  } catch (err) {
    res.status(400).json({
      success: false
    });
  }
};

//@desc         Delete Doctor Profile
//@route        DELETE /api/v1/bootcamps/:id
//@access       Private
exports.deleteDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);

    if (!doctor) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({
      success: false
    });
  }
};
