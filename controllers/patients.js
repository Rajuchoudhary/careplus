const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Patient = require('../models/Patient');

//@desc         Get All Patients
//@route        GET /api/v1/patients/
//@access       Public
exports.getPatients = asyncHandler(async (req, res, next) => {
  const patients = await Patient.find();

  if (!patients) {
    return res.status(400).json({ success: false, data: {} });
  }

  res
    .status(200)
    .json({ success: true, count: patients.length, data: patients });
});

//@desc         Get Single Patient
//@route        GET /api/v1/patients/:id
//@access       Public
exports.getPatient = asyncHandler(async (req, res, next) => {
  const patient = await Patient.findOne({ user: req.user.id });

  if (!patient) {
    return next(
      new ErrorResponse(
        `Patient profile with id of ${req.user.id} not found`,
        404
      )
    );
  }

  res.status(200).json({ success: true, data: patient });

  res.status();
});

//@desc         Register Patient
//@route        POST /api/v1/patients/
//@access       Public
exports.registerPatient = asyncHandler(async (req, res, next) => {
  const patient = await Patient.create(req.body);

  res.status(200).json({ success: true, data: patient });
});

//@desc         Update Single Patient
//@route        PUT /api/v1/patients/:id
//@access       Private
exports.updatePatient = asyncHandler(async (req, res, next) => {
  const patient = await Patient.findOneAndUpdate(
    { user: req.user.id },
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  if (!patient) {
    return next(
      new ErrorResponse(
        `Patient profile with id of ${req.user.id} not found`,
        404
      )
    );
  }

  res.status(200).json({ success: true, data: patient });
});

//@desc         Delete Single Patient
//@route        DELETE /api/v1/patients/:id
//@access       Private
exports.deletePatient = asyncHandler(async (req, res, next) => {
  const patient = await Patient.findOneAndDelete({ user: req.user.id });

  if (!patient) {
    return next(
      new ErrorResponse(
        `Patient profile with id of ${req.user.id} not found`,
        404
      )
    );
  }

  res.status(200).json({ success: true, data: {} });
});

//@desc         Uplaod Patient Profie
//@route        PUYT /api/v1/patients/:id/photo
//@access       Private
exports.uploadPatientPhoto = asyncHandler(async (req, res, next) => {
  const patient = await Patient.findOne({ user: req.user.id });

  if (!patient) {
    return next(
      new ErrorResponse(
        `Patient profile with id of ${req.user.id} not found`,
        404
      )
    );
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  const file = req.files.file;
  //Check if image is photo
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse('Please uplod and image', 400));
  }

  //Check if image size is less than allowed sied
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please uplaod image less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }

  //Change file name
  file.name = `photo_${patient._id}${path.parse(file.name).ext}`;

  //Move file to public folder
  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
    if (err) {
      console.log(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    await Patient.findOne({ user: req.user.id }, { photo: file.name });
    res.status(200).json({ success: true, data: file.name });
  });
});
