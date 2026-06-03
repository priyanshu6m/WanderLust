const Listing = require('../models/listing');

module.exports.index = async (req, res) => {
    let allListings = await Listing.find({});
    res.render('listings/index.ejs', { listings: allListings });
  };

module.exports.renderNewForm =  (req, res) => {
  res.render('listings/new.ejs');
};

module.exports.showListing = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id)
      .populate({path: 'reviews', populate: {path: 'author'}})
      .populate('owner');
    if (!listing) {
      req.flash('error', 'Listing Not Found');
      return res.redirect('/listings');
    } 
    res.render('listings/show.ejs', { listing });
      
  };

  module.exports.createListing = async (req, res, next) => {
      if(typeof req.file === "undefined"){
        req.flash('error', 'Image is required');
        return res.redirect('/listings/new');
      };
      let url = req.file.path;
      let filename = req.file.filename;
      const newListing = new Listing(req.body.listing);
      newListing.owner = req.user._id;
      newListing.image = { url, filename };
      await newListing.save();
      req.flash('success', 'New Listing Created');
      res.redirect('/listings');
    };

module.exports.renderEditForm = async (req, res) => {
    const id = req.params.id;
    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash('error', 'Listing Not Found');
      return res.redirect('/listings');
    } else {
      let originalImageUrl = listing.image.url;
      originalImageUrl = originalImageUrl.replace('/upload', '/upload/w_250');
      res.render('listings/edit.ejs', { listing, originalImageUrl });
    }
  };

module.exports.updateListing = async (req, res) => {
    const { id } = req.params;
    let editListing = await Listing.findByIdAndUpdate(id, {
      ...req.body.listing
    });
    if(typeof req.file !== "undefined"){
      let url = req.file.path;
      let filename = req.file.filename;
      editListing.image = { url, filename };
      await editListing.save();
    }
    
    req.flash('success', 'Listing Updated');
    res.redirect(`/listings/${id}`);
    
  };

  module.exports.destroyListing = async (req, res) => {
      const id = req.params.id;
      console.log(id);
      let deleteListing = await Listing.findByIdAndDelete(id);
      console.log(deleteListing);
      req.flash('success', 'Listing Deleted');
      res.redirect('/listings');
    };

 module.exports.searchListings = async (req, res) => {
  const query = req.query.q;

  if (!query || query.trim() === "") {
    return res.redirect("/listings");
  }

  const listings = await Listing.find({
    $or: [
      { title: { $regex: query, $options: "i" } },
      { location: { $regex: query, $options: "i" } },
      { country: { $regex: query, $options: "i" } }
    ]
  });

  res.render("listings/search.ejs", { listings, query });
};