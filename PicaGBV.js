{
	"translatorID": "b98e97d4-44d4-43a5-9ad1-0913353249f5",
	"label": "PicaGBV",
	"creator": "Philipp Zumstein",
	"target": "txt",
	"minVersion": "3.0",
	"maxVersion": "",
	"priority": 100,
	"inRepository": true,
	"translatorType": 2,
	"browserSupport": "gcs",
	"lastUpdated": "2017-02-01 08:10:00"
}


/*
	***** BEGIN LICENSE BLOCK *****

	Copyright © 2017 Philipp Zumstein

	This file is part of Zotero.

	Zotero is free software: you can redistribute it and/or modify
	it under the terms of the GNU Affero General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	Zotero is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
	GNU Affero General Public License for more details.

	You should have received a copy of the GNU Affero General Public License
	along with Zotero. If not, see <http://www.gnu.org/licenses/>.

	***** END LICENSE BLOCK *****
*/

var ssgNummer = false;
var exportAbstract = false;
var defaultLanguage = "eng";
var physicalForm = "O";//0500 Position 1
var cataloguingStatus = "u";//0500 Position 3

var journalMapping = {
	"0006-1972" : "!265780543!", // Bibliotheksdienst https://gso.gbv.de/DB=2.1/PPNSET?PPN=265780543
	"2191-4761" : "!664266169!", // Journal of management control http://gso.gbv.de/DB=2.1/PPNSET?PPN=664266169
	"1365-1005" : "!306717743!", // Macroeconomic dynamics
	"2251-7316" : "!779400933!", // Journal of Global Entrepreneurship Research
	"2228-7566" : "!779400933!", // Journal of Global Entrepreneurship Research
	"2147-4478" : "!749502029!", // International Journal of Research in Business and Social Science
	"1552-5465" : "!320495078!", // The journal of environment & development
	"1070-4965" : "!749502029!", // The journal of environment & development	
	"2147-4281" : "!684128632!", // Eurasian business review
	"1309-4297" : "!684128632!", // Eurasian business review	
	"2191-1991" : "!670605115!", // Health economics review
	"2157-5665" : "!669053910!", // Entrepreneurship research journal
	"2194-6175" : "!669053910!", // Entrepreneurship research journal
	"1923-9343" : "!64482638X!", // Management science letters
	"1923-9335" : "!64482638X!", // Management science letters
	"2152-2812" : "!635603101!", // Journal of benefit-cost analysis
	"2194-5888" : "!635603101!", // Journal of benefit-cost analysis
	"1834-2019" : "!624830691!", // Australasian accounting business and finance journal
	"1834-2000" : "!624830691!", // Australasian accounting business and finance journal
	"1935-1682" : "!523858612!", // The B.E. journal of economic analysis & policy
	"2059-1403" : "!727810146!", // The IMP journal
	"1555-7561" : "!507184807!", // Theoretical economics
	"2214-4625" : "!774106808!", // Arab Economic and Business Journal
	"2340-9436" : "!787023329!", // BRQ Business Research Quarterly
	"2340-9436" : "!787023329!", // BRQ Business Research Quarterly
	"1303-0701" : "!389124346!", // Central Bank Review
	"1305-8800" : "!389124346!", // Central Bank Review
	"1755-3091" : "!623296454!", // China Journal of Accounting Research
	"2352-7285" : "!86138203X!", // Development Engineering
	"1517-7580" : "!578536218!", // EconomiA
	"2352-4847" : "!820689033!", // Energy Reports
	"2444-8451" : "!859889785!", // European Journal of Management and Business Economics
	"2444-8834" : "!85914366X!", // European Research on Management and Business Economics
	"2314-7210" : "!837953758!", // Future Business Journal
	"1822-8038" : "!668707917!", // Intellectual Economics
	"1822-8011" : "!668707917!", // Intellectual Economics
	"0185-1667" : "!612652823!", // Investigación Económica
	"2214-8515" : "!823904024!", // Journal of African Trade
	"2218-0648" : "!61879364X!", // Journal of Economics, Finance and Administrative Science
	"2077-1886" : "!61879364X!", // Journal of Economics, Finance and Administrative Science
	"2444-569X" : "!880796871!", // Journal of Innovation & Knowledge
	"2226-5856" : "!837630150!", // Journal of Urban Management
	"2405-4739" : "!83559100X!", // Russian Journal of Economics
	"2444-9695" : "!769569048!", // Spanish Journal of Marketing - ESIC
	"2212-9774" : "!742220354!", // Wine Economics and Policy
	"2365-6417" : "!844433179!", // Asian Journal of Sustainability and Social Responsibility
	"2196-288X" : "!815913826!", // Brazilian Journal of Science and Technology
	"2366-0074" : "!862732875!", // International Journal of Corporate Social Responsibility
	"2245-408X" : "!800998790!", // Journal of Organization Design
	"2364-4575" : "!844386278!", // Journal of Shipping and Trade
	"2197-1927" : "!791558916!", // Triple Helix
	"1837-6614" : "!557882230!", // International Journal of Business Science and Applied Management
	"2013-0953" : "!600307298!", // Journal of Industrial Engineering and Management
	"1759-7331" : "!633816477!", // Quantitative Economics
	"1406-099X" : "!543593630!", // Baltic Journal of Economics
};

var nachnameMapping = {
};

var nameMapping = {
};


//Sprachcodes nach ISO 639-2
//https://www.gbv.de/bibliotheken/verbundbibliotheken/02Verbund/01Erschliessung/02Richtlinien/02KatRichtRDA/anhaenge/anhang-sprachcodes
var languageMapping = {
	"en" : "eng",
	"de" : "ger",
	"fr" : "fre"
};
var issnLangMapping = {
	"0006-1972" : "ger",
	"1365-1005" : "eng"
};


var issnVolumeMapping = {
};


// Da alles asynchron ablaufen kann:
//Jede Lookup einer AutorIn zählt 1 zu count
//und nach Erledigung wieder 1 weg. Der
//Startwert ist 1 und nach Erledigung aller
//anderen Zeilen wird 1 subtrahiert. Erst
//bei 0 wird die Ausgabe aus outputText erzeugt.
var count = 1;
var outputText = "";


function writeLine(code, line) {

	//Halbgeviertstrich ersetzen
	line = line.replace(/–/g, '-');

	//Text zusammensetzen
	outputText += code + " " + line + "\n";
}
/*

// Lookup für Autoren wird in der ZBW nicht durchgeführt

 	//Lookup für Autoren
	if ((code == "3000" || code == "3010") && line[0] != "!") {
		count++;
		var authorName = line.substring(0,line.indexOf("$"));
		var lookupUrl = "https://gso.gbv.de/DB=1.1/CMD?ACT=SRCHM&ACT3=*&MATCFILTER=Y&MATCSET=Y&PARSE_MNEMONICS=N&PARSE_OPWORDS=N&PARSE_OLDSETS=N&IMPLAND=Y&ACT0=SRCHA&screen_mode=Suchen&IKT0=4&TRM0=&ACT1=*&IKT1=8196&TRM1=" + authorName +"&IKT2=8183&TRM2=&ADI_MAT=T";
		//lookupUrl kann je nach Anforderung noch spezifiziert werden, z.B.
		//var lookupUrl = "https://gso.gbv.de/DB=1.1/CMD?ACT=SRCHM&ACT3=*&MATCFILTER=Y&MATCSET=Y&PARSE_MNEMONICS=N&PARSE_OPWORDS=N&PARSE_OLDSETS=N&IMPLAND=Y&ACT0=SRCHA&screen_mode=Suchen&IKT0=4&TRM0=&ACT1=*&IKT1=8196&TRM1=" + authorName +"&ACT2=*&IKT2=5040&TRM2=&SRT=YOP&ADI_TAA=&ADI_LND=&ADI_JVU=&IKT3=8183&TRM3=&ADI_MAT=T";
		//var lookupUrl = "http://swb.bsz-bw.de/DB=2.104/SET=70/TTL=1/CMD?SGE=&ACT=SRCHM&MATCFILTER=Y&MATCSET=Y&NOSCAN=Y&PARSE_MNEMONICS=N&PARSE_OPWORDS=N&PARSE_OLDSETS=N&IMPLAND=Y&NOABS=Y&ACT0=SRCHA&SHRTST=50&IKT0=1004&TRM0=" + authorName +"&ACT1=*&IKT1=2057&TRM1=3.*&ACT2=*&IKT2=8991&TRM2=theol*&ACT3=*&IKT3=8991&TRM3=19**";
		ZU.processDocuments([lookupUrl], function(doc, url){
			var ppn = ZU.xpathText(doc, "/html/body/div/div/span/div/table/tbody/tr[1]/td[@class='rec_title']/div/span[1]");
			if (ppn) {
				outputText = outputText.replace(authorName, "!" + ppn.trim() + "!");
			}
		}, function() {
			count--;
			if (count === 0) {
				Zotero.write(outputText);
			}
		});
	}
}
*/
// hier ausgeschnitten

function doExport() {
	var item;
	while ((item = Zotero.nextItem())) {
		
		//enrich items based on their ISSN
		if (!item.language && item.ISSN && issnLangMapping[item.ISSN]) {
			item.language = issnLangMapping[item.ISSN];
		}
		if (item.volume && item.ISSN && issnVolumeMapping[item.ISSN]) {
			item.volume = issnVolumeMapping[item.ISSN] + item.volume;
		}
		
		if (!item.DOI && item.extra) {
			var extraParts = item.extra.split("\n");
			var j;
			for (j=0; j<extraParts.length; j++) {
				if (extraParts[j].indexOf("DOI:") === 0) {
					item.DOI = extraParts[j].substr(4).trim();
				}
			}
		}

		var article = false;
		switch (item.itemType) {
			case "journalArticle":
			case "bookSection":
			case "magazineArticle": // wird bei der Erfassung von Rezensionen verwendet. Eintragsart "Magazin-Artikel" wird manuell geändert.
			case "newspaperArticle":
			case "encyclopediaArticle":
				article = true;
				break;
		}
		
		//item.type --> 0500 Bibliographische Gattung und Status
		//http://swbtools.bsz-bw.de/cgi-bin/help.pl?cmd=kat&val=0500&regelwerk=RDA&verbund=GBV
		if (article) {
			writeLine("0500", physicalForm+"s"+cataloguingStatus);//z.B. Osu
		} else {
			writeLine("0500", physicalForm+"a"+cataloguingStatus);//z.B. Aau
		}
		
		//item.type --> 0501 Inhaltstyp
		writeLine("0501", "Text$btxt");
		
		if (physicalForm === "A") {
		
			//item.type --> 0502 Medientyp
			writeLine("0502", "ohne Hilfsmittel zu benutzen$bn");
			
			//item.type --> 0503 Datenträgertyp
			writeLine("0503", "Band$bnc");
			
		}
		
		if (physicalForm === "O") {
		
			//item.type --> 0502 Medientyp
			writeLine("0502", "Computermedien$bc");
			
			//item.type --> 0503 Datenträgertyp
			writeLine("0503", "Online-Ressource$bcr");
			
		}
		
		//item.date --> 1100 
		var date = Zotero.Utilities.strToDate(item.date);
		if (date.year !== undefined) {
			writeLine("1100", date.year.toString());
		}
		
		//1131 Art des Inhalts
		if (item.itemType == "magazineArticle") {
			writeLine("1131", "!209083166!");
		}
				
		//item.language --> 1500 Sprachcodes
		if (item.language) {
			if (languageMapping[(item.language)]) {
				item.language = languageMapping[item.language];
			}
			writeLine("1500", item.language);
		} else {
			writeLine("1500", defaultLanguage);
		}
			
		//1505 Katalogisierungsquelle
		writeLine("1505", "$erda");
		
		//item.ISBN --> 2000 ISBN
		if (item.ISBN && physicalForm === "A") {
			writeLine("2000", item.ISBN);
		}
		
		//item.DOI --> 2051 bei "Oou" bzw. 2053 bei "Aou"
		//http://swbtools.bsz-bw.de/cgi-bin/help.pl?cmd=kat&val=2051&regelwerk=RDA&verbund=GBV
		if (physicalForm === "O") {
			//Feld 2051 soll immer ausgegeben werden,
			//auch wenn kein Wert ermittelt werden konnte
			if (!item.DOI) {
				item.DOI = "";
			}
			writeLine("2051", item.DOI);
		} else if (physicalForm === "A") {
			writeLine("2053", item.DOI);
		}
		
		//Autoren --> 3000, 3010
		//Titel, erster Autor --> 4000
		var titleStatement = "";
		if (item.shortTitle) {
			titleStatement += item.shortTitle;
			if (item.title && item.title.length > item.shortTitle.length) {
				titleStatement += "$d" + item.title.substr(item.shortTitle.length).replace(/^\s*:\s*/,'');
			}
		} else {
			titleStatement += item.title.replace(/\s*:\s*/,'$d');
		}
		
		//Sortierzeichen hinzufügen, vgl. https://github.com/UB-Mannheim/zotkat/files/137992/ARTIKEL.pdf
		if (item.language == "ger" || !item.language) {
			titleStatement = titleStatement.replace(/^(Der|Die|Das|Des|Dem|Den|Ein|Eines|Einem|Eine|Einen|Einer) ([^@])/, "$1 @$2");
		}
		if (item.language == "eng" || !item.language) {
			titleStatement = titleStatement.replace(/^(The|A|An) ([^@])/, "$1 @$2");
		}
		if (item.language == "fre" || !item.language) {
			titleStatement = titleStatement.replace(/^(Le|La|Les|Des|Un|Une) ([^@])/, "$1 @$2");
			titleStatement = titleStatement.replace(/^L'([^@])/, "L'@$1");
		}
		if (item.language == "ita" || !item.language) {
			titleStatement = titleStatement.replace(/^(La|Le|Lo|Gli|I|Il|Un|Una|Uno) ([^@])/, "$1 @$2");
			titleStatement = titleStatement.replace(/^L'([^@])/, "L'@$1");
		}
		
		var i = 0, content, creator;
		while (item.creators.length>0) {
			creator = item.creators.shift();
			if (creator.creatorType == "author") {
				if (creator.firstName && nameMapping[creator.lastName + ", " + creator.firstName]) {
					content = nameMapping[creator.lastName + ", " + creator.firstName];
				} else if (nachnameMapping[creator.lastName]) {
					content = nachnameMapping[creator.lastName];
				} else {
					content = creator.lastName + (creator.firstName ? ", " + creator.firstName : "");
				}
				if (i === 0) {
					writeLine("3000", content + "$BVerfasserIn$4aut");
					titleStatement += "$h" + (creator.firstName ? creator.firstName + " " : "") + creator.lastName;
				} else {
					writeLine("3010", content + "$BVerfasserIn$4aut");
					titleStatement += ", " + (creator.firstName ? creator.firstName + " " : "") + creator.lastName;
				}
				i++;
			}
			//TODO: editors, other contributors...
		}
		
		//3290
		/*if (item.itemType == "journalArticle" || item.itemType == "magazineArticle" || item.itemType == "bookSection") {
			var container = "";
			if (item.publicationTitle) {
				container += item.publicationTitle;
			}
			if (item.place) {
				container += "$p" + item.place;
			}
			if (item.publisher) {
				container += "$n" + item.publisher;
				if (item.ISBN) {
					container += " " + item.ISBN;
				}
			}
			writeLine("3290", container);
		}*/
		
		writeLine("4000", titleStatement);
		
		//Ausgabe --> 4020
		if (item.edition) {
			writeLine("4020", item.edition);
		}
		
		//Erscheinungsvermerk --> 4030
		if (!article) {
			var publicationStatement = "";
			if (item.place) { publicationStatement += item.place; }
			if (item.publisher) { publicationStatement +=  "$n" + item.publisher; }
			writeLine("4030", publicationStatement);
		}
				
		//4070 $v Bandzählung $j Jahr $a Heftnummer $p Seitenzahl
		if (item.itemType == "journalArticle" || item.itemType == "magazineArticle" || item.itemType == "bookSection") {
			var volumeyearissuepage = "";
			if (item.volume) { volumeyearissuepage += "$v" + item.volume; }
			if (date.year !== undefined) { volumeyearissuepage +=  "$j" + date.year; }
			if (item.issue) { volumeyearissuepage += "$a" + item.issue; }
			if (item.pages) { volumeyearissuepage += "$p" + item.pages; }
			
			writeLine("4070", volumeyearissuepage);
		}
		
		//URL --> 4083
		if (physicalForm == "O") {
			if (item.DOI && item.DOI !== "") {
				writeLine("4083", "$ahttps://doi.org/" + item.DOI +"$4OALizenz");
			} else if (item.url) {
				if (item.url)
				writeLine("4083", "$a" + item.url);
			}
		}
		
		//Reihe --> 4110
		if (!article) {
			var seriesStatement = "";
			if (item.series) {
				seriesStatement += item.series;
			}
			if (item.seriesNumber) {
				seriesStatement += " ; " + item.seriesNumber;
			}
			writeLine("4110", seriesStatement);
		}
		
		//Inhaltliche Zusammenfassung --> 4207/4209
		if (item.abstractNote && item.abstractNote.length <= 600) {
			writeLine("4207", item.abstractNote);
		}
		if (item.abstractNote && item.abstractNote.length > 600){
			writeLine("4209", item.abstractNote);
		}

		
		//item.publicationTitle --> 4241 Beziehungen zur größeren Einheit 
		if (item.itemType == "journalArticle" || item.itemType == "magazineArticle" || item.itemType == "bookSection") {
			if (item.ISSN && journalMapping[ZU.cleanISSN(item.ISSN)]) {
				writeLine("4241", "Enthalten in" + journalMapping[ZU.cleanISSN(item.ISSN)]);
			} else {
				writeLine("4241", "Enthalten in!PPN!");
			}
		}
		
		//4261 Themenbeziehungen (Beziehung zu der Veröffentlichung, die beschrieben wird)|case:magazineArticle
		if (item.itemType == "magazineArticle") {
			writeLine("4261", "Rezension von!!"); // zwischen den Ausrufezeichen noch die PPN des rezensierten Werkes manuell einfügen.
		}
				
		//SSG-Nummer --> 5056
		if (ssgNummer) {
			writeLine("5056", ssgNummer);
		}

		//5249 Code für Veröffentlichungsart (STW)
		writeLine ("5249", "$b49$cAufsatz in Zeitschrift$dArticle");

		//lokale Schlagwörter und JEL-Codes --> 6556/5060
		var jels = [];
		var keywords = [];
		for (i=0; i<item.tags.length; i++) {
			if (item.tags[i].tag.match(/^[A-Z][0-9]{1,3}$/)) {
				jels.push(item.tags[i].tag);
			}
			else {
				keywords.push(item.tags[i].tag);
			}		
			//writeLine("6556", item.tags[i].tag.replace(/\s?--\s?/g, ';'));
		}
		
		if (jels.length > 0) {
			writeLine("5060", "[JEL] " + jels.join(" ; "));
		}
		if (keywords.length > 0) {
			for (i=0; i<keywords.length; i++) {
				writeLine("6556", keywords[i]);
			}
		}
		
		
		// 0999 verify outputText ppn in Katalogisierungsdatenbank des GBV
		/*var ppnVerify1 = "https://gso.gbv.de/DB=1.1/CMD?ACT=SRCHM&ACT3=*&MATCFILTER=Y&MATCSET=Y&PARSE_MNEMONICS=N&PARSE_OPWORDS=N&PARSE_OLDSETS=N&IMPLAND=Y&ACT0=SRCHA&screen_mode=Suchen&IKT0=4&TRM0=&ACT1=*&IKT1=8196&TRM1=" + content + "&ACT2=*&IKT2=5040&TRM2=&SRT=YOP&ADI_TAA=&ADI_LND=&ADI_JVU=&IKT3=8183&TRM3=&ADI_MAT=T";
		var ppnVerify2 = "http://swb.bsz-bw.de/DB=2.104/SET=1/TTL=1/CMD?SGE=&ACT=SRCHM&MATCFILTER=Y&MATCSET=Y&NOSCAN=Y&PARSE_MNEMONICS=N&PARSE_OPWORDS=N&PARSE_OLDSETS=N&IMPLAND=Y&NOABS=Y&ACT0=SRCHA&SHRTST=50&IKT0=1004&TRM0=" + creator.lastName + "&ACT1=*&IKT1=2057&TRM1=3.*&ACT2=*&IKT2=8991&TRM2=19**&ACT3=%2B&IKT3=4060&TRM3=tpv*&ACT4=%2B&IKT4=8991&TRM4=theol* neutestament*&ACT5=*&IKT5=1004&TRM5=" + creator.lastName;
		if (item.creators) {
			 ppnVerify1 += item.creators;
		}
		writeLine("\n" + "0999 ".fontcolor("green") + "GND-Verkn&uuml;pfung checken:".fontcolor("green"), ppnVerify1.link(ppnVerify1));
		/*writeLine("\n" + "0999 ".fontcolor("green") + "MAPPING_BEDINGUNG > NACHNAME |AND| sn3.* |AND| 19** |OR| tpv* |OR| theol* neutestament*| VERIFY OUTPUT PPN IN OGND | LINK:   ".fontcolor("green"), ppnVerify2.link(ppnVerify2) + "\n");*/
		
	}
	outputText += "\n";
	
	count--;
	if (count === 0) {
		Zotero.write(outputText);
	}
}