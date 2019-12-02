const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Appointment = require('../models/Appointment');

//@desc         Create New Appointment
//@route        POST /api/v1/appointments
//@access       Public
exports.createAppointment = asyncHandler(async (req, res, next) => {
  const appointment = await Appointment.create(req.body);

  res.status(201).json({
    success: true,
    data: appointment
  });
});

//@desc         Get All Appointment
//@route        GET /api/v1/appointments
//@access       Private
exports.getAppointments = asyncHandler(async (req, res, next) => {
  const appointments = await Appointment.find().populate('Doctor');

  res
    .status(200)
    .json({ success: true, count: appointments.length, data: appointments });
});

//@desc         Get Single Appointment
//@route        GET /api/v1/appointments/:id
//@access       Private
exports.getAppointment = asyncHandler(async (req, res, next) => {
  const appointment = await Appointment.findById(req.params.id).populate({
    path: 'doctor',
    select: 'name schedule speciality'
  });

  if (!appointment) {
    return next(
      new ErrorResponse(
        `Appointment did  not find with id of ${req.params.id} `,
        404
      )
    );
  }

  res.status(200).json({ success: true, data: appointment });
});

//@desc         Update Appointment
//@route        PUT /api/v1/appointments/:id
//@access       Private
exports.updateAppointment = asyncHandler(async (req, res, next) => {
  const appointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!appointment) {
    return next(
      new ErrorResponse(
        `Appointment with id of ${req.params.id} not found`,
        404
      )
    );
  }

  res.status(200).json({
    success: true,
    data: appointment
  });
});

//@desc         Delete Appointment
//@route        DELETE /api/v1/appointments/:id
//@access       Private
exports.deleteAppointment = asyncHandler(async (req, res, next) => {
  const appointment = await Appointment.findByIdAndDelete(req.params.id);
  if (!appointment) {
    return next(
      new ErrorResponse(`Appoiint with id of ${req.params.id} not found`, 404)
    );
  }

  res.status(200).json({ success: true, data: {} });
});
