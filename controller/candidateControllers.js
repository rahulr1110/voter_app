const Candidate = require("../models/candidate");
const User = require("../models/user");

//checking user role
const checkAdminRole = async (userID) => {
  try {
    const user = await User.findById(userID);
    if (user.role === "admin") {
      return true;
    }
  } catch (error) {
    return false;
  }
};

//adding candidate
const addCandidateController = async (req, res) => {
  try {
    if (!(await checkAdminRole(req.user.id)))
      return res.status(403).json({ message: "user does not have admin role" });

    //getiing user(candidate) data
    const data = req.body;

    //creating new user as candidate
    const newCandidate = await new Candidate(data);

    //save the new user as candidate
    const response = await newCandidate.save();
    console.log("data saved");
    res.status(200).json({ response: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
};

//updatating the candidate profile
const updateCandidateController = async (req, res) => {
  try {
    if (!checkAdminRole(req.user.id))
      return res.status(403).json({ message: "user does not have admin role" });

    //getting the id from URL
    const { candidateID } = req.params;
    console.log(candidateID);
    //data of the candidate
    const updatedCandidateDate = req.body;

    const response = await Candidate.findByIdAndUpdate(
      candidateID,
      updatedCandidateDate,
      {
        new: true, // Return the updated document
        runValidators: true, // Run Mongoose validation
      }
    );

    if (!response) {
      return res.status(404).json({ error: "candidate not found" });
    }
    console.log(response);
    console.log("candidtae data updated");
    res.status(200).json(response);
  } catch (error) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//deleting the candidate profile
const deleteCandidateController = async (req, res) => {
  try {
    if (!checkAdminRole(req.user.id))
      return res.status(403).json({ message: "user does not have admin role" });

    const { candidateID } = req.params; // Extract the id from the URL parameter

    const response = await Candidate.findByIdAndDelete(candidateID);

    if (!response) {
      return res.status(404).json({ error: "Candidate not found" });
    }

    console.log("candidate deleted");
    res.status(200).send({
      success: true,
      message: "candidate deleted",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Add  Vote Controller

const addVoteController = async (req, res) => {
  let {candidateID} = req.params;
  let userId = req.user.id;

  try {
    const candidate = await Candidate.findById(candidateID);
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    if (user.role == "admin") {
      return res.status(403).json({ message: "admin is not allowed" });
    }
    if (user.isVoted) {
      return res.status(400).json({ message: "You have already voted" });
    }

    candidate.votes.push({ user: userId });
    candidate.voteCount++;
    await candidate.save();

    // update the user document
    user.isVoted = true;
    await user.save();

    return res.status(200).json({ message: "Vote recorded successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//getting the vote count
const voteCountController = async (req, res) => {
  try {
    const candidate = await Candidate.find().sort({ voteCount: "desc" });

    const voteRecord = candidate.map((data) => {
      return {
        party: data.party,
        count: data.voteCount,
      };
    });

    return res.status(200).json(voteRecord);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//getting all the candidate with namd and Party

const getAllCandidateController = async (req, res) => {
  try {
    const candidates = await Candidate.find({}, "name party -_id");

    // Return the list of candidates
    res.status(200).json(candidates);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  addCandidateController,
  updateCandidateController,
  deleteCandidateController,
  addVoteController,
  voteCountController,
  getAllCandidateController,
};
