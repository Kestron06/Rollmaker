const express=require("express");
const site=new express();
const fs=require("fs");
const path=require("path");
const ejs = require('ejs');
site.listen(80,()=>{
	console.log("Site online");
});
var oembed={
		"title": "Rick Astley - Never Gonna Give You Up (Official Music Video)",
		"author_url": "https://www.youtube.com/@RickAstleyYT",
		"type": "video",
		"height": 113,
		"width": 200,
		"version": "1.0",
		"provider_name": "YouTube",
		"provider_url": "https://www.youtube.com/",
		"thumbnail_height": 360,
		"thumbnail_width": 480,
		"thumbnail_url": "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
		"html": "\u003ciframe width=\u0022200\u0022 height=\u0022113\u0022 src=\u0022https://www.youtube.com/embed/dQw4w9WgXcQ?feature=oembed\u0022 frameborder=\u00220\u0022 allow=\u0022accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\u0022 allowfullscreen title=\u0022Rick Astley - Never Gonna Give You Up (Official Music Video)\u0022\u003e\u003c/iframe\u003e"
	};
site.get("/embed",(req,res)=>{
	ejs.renderFile('./ejsFiles/embed.ejs', {
		a:decodeURIComponent(req.query.a),
		t:decodeURIComponent(req.query.t),
		u:decodeURIComponent(req.query.u)
	}, {}, function(err, str) {
		if (err) {
			res.send(err);
			console.log(err);
			return;
		}
		res.send(str);
	});
});
site.get("/embJson",(req,res)=>{
	res.send(JSON.stringify(Object.assign(oembed,{author_name:req.query.a})));
});
site.use(express.static(path.join(__dirname,"./static")));