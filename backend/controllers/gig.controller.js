import Gig from "../models/gig.model.js";
import createError from "../utils/createError.js";

// Create a new gig
export const createGig = async (req, res, next) => {
  if (!req.isSeller) {
    return next(createError(403, "Only sellers can create a gig!"));
  }

  // Check for existing gig
  const existingGig = await Gig.findOne({
    userId: req.userId,
    title: req.body.title,
  });
  if (existingGig) {
    return next(
      createError(400, "You have already created a gig with this title.")
    );
  }

  // Check the number of gigs the user has already created
  const userGigs = await Gig.find({ userId: req.userId });
  const maxGigs = 10; // Set your maximum limit
  if (userGigs.length >= maxGigs) {
    return next(
      createError(400, `You have reached the maximum limit of ${maxGigs} gigs.`)
    );
  }

  const newGig = new Gig({
    userId: req.userId,
    ...req.body,
  });

  try {
    const savedGig = await newGig.save();
    res.status(201).json(savedGig);
  } catch (err) {
    next(err);
  }
};

// Delete a gig
export const deleteGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.gigId);
    if (!gig) {
      return next(createError(404, "Gig not found!"));
    }
    if (gig.userId.toString() !== req.userId) {
      return next(createError(403, "You can delete only your gig!"));
    }

    await Gig.findByIdAndDelete(req.params.gigId);
    res.status(200).json({ message: "Gig has been deleted!" });
  } catch (err) {
    next(err);
  }
};

// Get a specific gig
export const getGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.gigId).populate("userId");

    if (!gig) {
      return next(createError(404, "Gig not found!"));
    }
    res.status(200).json(gig);
  } catch (err) {
    next(err);
  }
};

// Get all gigs with optional filters
export const getGigs = async (req, res, next) => {
  const q = req.query;
  const filters = {
    ...(q.userId && { userId: q.userId }),
    ...(q.cat && { cat: { $regex: new RegExp(`^${q.cat}$`, "i") } }),
    ...((q.min || q.max) && {
      price: {
        ...(q.min && { $gte: q.min }),
        ...(q.max && { $lte: q.max }),
      },
    }),
    ...(q.search && { title: { $regex: q.search, $options: "i" } }),
  };

  try {
    const gigs = await Gig.find(filters)
      .sort({ [q.sort]: -1 })
      .populate("userId");
    res.status(200).json(gigs);
  } catch (err) {
    next(err);
  }
};
