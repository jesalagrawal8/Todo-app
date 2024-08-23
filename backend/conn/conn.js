const mongoose = require("mongoose");

const conn = async (req, res) => {
try {
    await mongoose
    .connect("mongodb+srv://jesalagrawal8:jesal1118@cluster0.oczzp.mongodb.net/todoApp" )
    .then(() =>{
    console.log("Connected");
});
} catch (error){
    res.status(400).json({
        message: "Not Connected",
    });
}
};
conn();