(function ($hx_exports) { "use strict";
$hx_exports.data = $hx_exports.data || {};
var HxOverrides = function() { };
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var data_Paths = $hx_exports.data.Paths = function() { };
data_Paths.main = function() {
};
var haxe_IMap = function() { };
var haxe_ds_StringMap = function() {
	this.h = { };
};
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	setReserved: function(key,value) {
		if(this.rh == null) this.rh = { };
		this.rh["$" + key] = value;
	}
	,keys: function() {
		var tmp;
		var _this = this.arrayKeys();
		tmp = HxOverrides.iter(_this);
		return tmp;
	}
	,arrayKeys: function() {
		var out = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) out.push(key);
		}
		if(this.rh != null) {
			for( var key in this.rh ) {
			if(key.charCodeAt(0) == 36) out.push(key.substr(1));
			}
		}
		return out;
	}
};
var __map_reserved = {}
data_Paths.greenTurtle_1 = [[-3.77551720427859117,-128.223742109622492,0.],[-3.96764015118173585,-128.942566361455704,0.],[-3.80865725068304517,-130.203537122806409,0.],[-4.18509034537972457,-130.894335365741512,0.],[-5.00179621141511088,-131.840491974361299,0.],[-4.65140191090676,-133.373085421994602,0.],[-4.35214488713413061,-134.321730388360692,0.],[-4.84941237952222526,-136.121615377530588,0.],[-5.7067545291306061,-137.892864310688793,0.],[-6.95413833305809437,-138.133890862377712,0.],[-8.39870484063325407,-137.1670458351349,0.],[-8.68751709648837434,-137.685337300817508,0.],[-8.73999348067523663,-139.064923512616588,0.],[-8.52159789195962603,-139.761772247802611,0.],[-9.21989486544554104,-140.719948227595694,0.],[-9.61734775265083464,-141.412490052927211,0.],[-9.59537273528240675,-142.043479489131414,0.],[-9.5934179255737444,-142.68388313242761,0.],[-9.59972852654614,-143.083063574397,0.],[-9.91203083736769486,-143.665696828373,0.],[-10.1197844674642408,-144.077436461805405,0.],[-10.8817074104718898,-144.140741195214,0.],[-11.8910266028715199,-144.168084419165609,0.],[-12.4254955036709909,-144.344545008000495,0.]];
data_Paths.greenTurtle_4 = [[-16.5083917851314794,-167.317514265076795,0.],[-16.0760562200316315,-166.544657200169496,0.],[-15.4147014072360893,-166.190449351759696,0.],[-14.8498339204080896,-166.126823992140203,0.],[-14.1197769382726097,-165.894407923475711,0.],[-13.1467915362352397,-165.684475105760811,0.],[-12.5192412978801606,-165.628221407271695,0.],[-11.9439717721211593,-165.313891440739496,0.],[-11.3079651599581794,-164.88772468014929,0.],[-11.0708299915886101,-164.23576768195,0.],[-11.2994289608601797,-162.74232940524891,0.],[-12.1615699695221195,-160.80969319907129,0.],[-12.3077983823291195,-159.180503347048301,0.],[-12.3071768688812799,-156.753965412619,0.],[-11.8653551111677302,-155.793110397752088,0.],[-11.3037062200279195,-155.284766532800887,0.],[-11.1557077776411102,-154.619183952712689,0.],[-10.9019017091898895,-154.020192049970291,0.],[-10.9923984949228402,-153.258084277826,0.],[-11.1401359445485,-152.844362589276898,0.],[-11.3538346533607299,-152.501231232555597,0.],[-11.3159890356673305,-151.20435586508,0.],[-11.1249050605586106,-150.496266780689297,0.],[-10.8979070577029908,-149.749438369001808,0.],[-10.5668743264396792,-148.854586819265307,0.],[-10.3695965595862098,-147.883605311262897,0.],[-10.3743682502035899,-147.051441047714405,0.],[-10.4113301799376892,-145.990171551713,0.],[-10.75792175858283,-145.139211543321693,0.],[-11.4532663855006795,-144.915972071740413,0.],[-12.7779490053603304,-144.529260148552595,0.]];
data_Paths.dwarfMinkeWhale_4 = [[-44.0626229380649406,-149.1006568197202,0.],[-44.9099485239582918,-147.540234437403086,0.],[-43.6613653108648165,-143.4484221780057,0.],[-42.5818120936625633,-142.764002454608686,0.],[-41.1770701417871479,-142.867702122729895,0.],[-40.371677192337458,-144.156940667952398,0.],[-39.6155394759578314,-145.073449595028904,0.],[-40.1692910682426216,-146.042402501438204,0.],[-40.09160791213273,-147.116135871493697,0.],[-39.3201064650034624,-147.899191495292,0.],[-38.7128257108372225,-148.401920326506314,0.],[-37.4715499891738,-151.668820551042813,0.],[-34.6748129563777923,-152.562769753172489,0.],[-33.2570453328623472,-153.535229132021612,0.],[-32.0418550848851069,-154.473832823152,0.],[-29.6233462298880497,-154.359413873550494,0.],[-27.1236046132650088,-154.136555393682102,0.],[-25.2121174567925905,-154.644187738086288,0.],[-23.2194159321172506,-153.547964986405788,0.],[-20.7621525866003509,-154.03372181411,0.],[-20.1058190656713691,-153.781736618776193,0.],[-19.4827449350710786,-151.276922508355796,0.],[-18.8536139740509086,-149.094539629184197,0.],[-17.2242335133939299,-147.224664560509211,0.],[-16.1922194975778808,-146.513088861403901,0.],[-15.5503699150093198,-146.163193501296,0.],[-13.9952437663796694,-145.748994993864699,0.]];
data_Paths.greenTurtle_7 = [[-6.15421490598358378,-134.905614207180804,0.],[-6.48318190658260374,-134.9780134630752,0.],[-6.65013131584300687,-134.870015712373402,0.],[-6.90972651678547667,-134.825530497500893,0.],[-7.20374013854703943,-134.622886251740113,0.],[-8.00649660010925146,-135.573852543582205,0.],[-8.39158166739783162,-137.163734081756388,0.],[-8.67751600511133425,-137.816439327852692,0.],[-8.61880989362852,-138.864642516415,0.],[-8.49186384476414347,-139.080101826902791,0.],[-8.40463090624124121,-139.348965573943502,0.],[-8.3983328809783373,-139.80585945382029,0.],[-8.74690905874350477,-140.301748915332809,0.],[-9.45516487656118265,-140.910196961597393,0.],[-9.54644021043896096,-141.560768567402391,0.],[-9.6520259285226,-142.249000878397396,0.],[-9.7833507964637576,-142.848305307675503,0.],[-10.6265843350619,-143.259874944930687,0.],[-11.5250750053692794,-143.776779172415388,0.],[-12.3728506078041391,-144.344044695847288,0.],[-12.6324205089539099,-144.552848546363691,0.]];
data_Paths.dwarfMinkeWhale_2 = [[-53.2250584548088881,-142.672736376591388,0.],[-48.6954057789822,-144.937695729183105,0.],[-46.9931726679814119,-144.661330346410693,0.],[-44.201032352634293,-143.50060501625731,0.],[-42.4982505620253477,-143.464167978844699,0.],[-40.7931851921368391,-144.080723045919797,0.],[-39.3481588131217705,-145.032094574792296,0.],[-39.683619614156,-146.09020401051,0.],[-39.0592041403006789,-149.40615130094011,0.],[-38.3999600745476073,-150.4702065788303,0.],[-36.7958634454986893,-151.258221557163893,0.],[-35.583162608328422,-152.108916185785205,0.],[-34.1167693248737081,-152.444613885873309,0.],[-32.6702554220914507,-153.27632858066309,0.],[-30.2403301878652897,-154.43102371075949,0.],[-27.9513300060522489,-154.746608986611392,0.],[-26.7116841146047399,-154.185710653387304,0.],[-26.1457257963793,-154.206453123873189,0.],[-25.015712820875919,-153.986589342207395,0.],[-23.9144808204616,-153.438008867082488,0.],[-23.1329238945281297,-152.760074325249604,0.],[-22.2244241707250687,-151.756795361439,0.],[-21.6983281671820691,-150.480825354296513,0.],[-20.0472511080622802,-149.713054699997514,0.],[-18.7978694012652383,-148.0207015153903,0.],[-16.5225796645215084,-146.382563934990714,0.],[-15.8720512216707608,-145.950931891999,0.],[-15.4125717046356492,-145.840174538604487,0.],[-15.0323670740080306,-145.734469427536595,0.],[-14.6501087171873206,-145.593644745503894,0.],[-14.5728022589403103,-145.533051757516887,0.],[-14.3570602392847,-145.349250028511506,0.],[-13.3251549165457792,-144.800248912184287,0.],[-12.0632961458297707,-144.45514304629171,0.],[-11.5808620745405193,-144.505056391914,0.]];
data_Paths.greenTurtle_5 = [[-25.8419952615682398,-153.332828479830113,0.],[-25.4182326755621091,-153.510972378282787,0.],[-24.9952287223609595,-153.64557499900269,0.],[-24.5896354576617817,-153.354809896863,0.],[-24.5312165146613701,-152.515884853972409,0.],[-24.3941036566846812,-152.207543564261698,0.],[-23.9975155476686,-152.027581132938707,0.],[-23.9224358775419397,-151.598461898656,0.],[-23.4594813373465101,-151.398431200241305,0.],[-23.149505947232079,-151.217653106968214,0.],[-22.7269236949544293,-150.921716109283807,0.],[-22.3104866060674709,-150.864520463258714,0.],[-21.9136249703284811,-150.067315414416612,0.],[-21.2339831148140092,-149.470746182232801,0.],[-20.1669748141081,-149.24546176960439,0.],[-19.6770835418645795,-148.711273157994412,0.],[-19.5407748725484,-148.21105338972211,0.],[-19.16504221323137,-147.473774830745299,0.],[-18.9758952750579617,-146.944009758740208,0.],[-18.6276564566335,-146.784075757025704,0.],[-18.03722740973312,-146.433550221022813,0.],[-16.8439313992044184,-146.116723463452,0.],[-16.4003874107893601,-145.802663556259205,0.],[-15.8878351960895507,-145.560947404747,0.],[-15.2232985579451405,-145.790742412604914,0.],[-14.6123205959214602,-145.643720020765613,0.],[-14.5336372012076,-145.092742474126709,0.],[-14.1462387224547896,-144.636662575934707,0.],[-13.9469690498846699,-144.380815215764187,0.],[-14.0951608817013607,-144.177203150094414,0.],[-13.9769170639733,-143.790433206342897,0.],[-13.4549630951991599,-143.75880991183331,0.],[-13.0653027193961204,-143.830428387879891,0.],[-12.64184233002198,-144.465982453959811,0.]];
data_Paths.dwarfMinkeWhale_3 = [[-44.989845319785708,-144.584618383452607,0.],[-44.232251306692,-145.458220029618786,0.],[-44.6141137424894,-148.0772371824728,0.],[-44.1793459938028832,-149.680201417123897,0.],[-41.7610540439621332,-149.852670729408686,0.],[-39.916697891428413,-150.353942631570504,0.],[-38.8434464995944921,-151.4673578597247,0.],[-37.0586022379606632,-151.458678940670893,0.],[-35.155897119787177,-151.667272855359414,0.],[-31.0493307904239302,-153.828737484858607,0.],[-29.1091858656759506,-155.181543656483313,0.],[-27.1209701470176903,-154.828895007892,0.],[-24.3902139190123286,-153.314332802520198,0.],[-22.4957332869328,-151.222846567909386,0.],[-21.505791631439,-150.391887931116287,0.],[-20.8895910749300917,-150.057133409277299,0.],[-19.4717259152162505,-148.614336379732208,0.],[-18.3674716719379205,-148.637595384155702,0.],[-17.3802554368041804,-147.725688008318087,0.],[-16.8578065565356709,-146.817828963094,0.],[-16.4206049178414695,-146.274730934788607,0.],[-14.8974576936677394,-145.785773334474413,0.],[-13.5176857528884,-145.227486028686087,0.],[-12.2682567102798092,-145.140728847378398,0.]];
data_Paths.greenTurtle_2 = [[-11.8335010397101499,-129.732491822181,0.],[-11.4085245474314192,-129.884860835748498,0.],[-11.1120157087975802,-130.005535402465114,0.],[-10.9692195749173393,-130.370470603357489,0.],[-11.1625710996891208,-130.748055937028511,0.],[-11.2421170565550508,-131.052261208178493,0.],[-11.1524678727782405,-131.321745265828696,0.],[-11.0473122846588208,-131.89881403870271,0.],[-10.9211961592076499,-132.42042446972,0.],[-10.8482364764485801,-132.691774100914,0.],[-11.1304346597800592,-132.764999711151887,0.],[-11.2455561609685599,-133.112427812526306,0.],[-11.3791954840368206,-133.461184328738597,0.],[-11.5888369865359309,-134.026817489807087,0.],[-11.8163360728026507,-134.399588958143596,0.],[-11.8174206014031107,-134.815702008007406,0.],[-11.9122937041545391,-135.054323499786193,0.],[-11.9314556190757894,-135.314176187846812,0.],[-11.7795600746010596,-135.756580108660586,0.],[-11.3974209339540806,-136.304039148790309,0.],[-11.0875691394914497,-136.609215006744,0.],[-10.8011625465557,-136.931050925647412,0.],[-10.9465206988694703,-137.467398035492408,0.],[-11.0268932062344,-138.294091468423289,0.],[-11.1036555300126594,-139.319548816449696,0.],[-11.0685554804673796,-139.9555912267314,0.],[-10.9142015818249192,-140.837066944220794,0.],[-10.8772570909209101,-141.352041981714507,0.],[-10.7268415628062499,-141.732002521754509,0.],[-10.4890490666315905,-142.09814452199,0.],[-10.4671850351503206,-142.423882452670711,0.],[-10.6595977577431604,-142.850356603253914,0.],[-10.8883899988774697,-142.981370289291789,0.],[-11.3167930944134802,-143.310062309193114,0.],[-11.7472096975582,-143.644827249353312,0.],[-12.2956182953094508,-144.105743905283305,0.],[-12.4397190382505496,-144.309781387277695,0.]];
data_Paths.dwarfMinkeWhale_1 = [[-58.0664417891667668,-125.415680150236497,0.],[-55.6295655615863467,-125.669052028651606,0.],[-53.5675269525945907,-127.267928376675,0.],[-50.4080620490514,-133.5113699846749,0.],[-50.0554610120262,-138.109130367984307,0.],[-47.8421547353259626,-141.375690584489405,0.],[-45.3580684648359878,-142.793047095993586,0.],[-42.3585849354004935,-143.114609154728811,0.],[-40.9163820314601594,-143.844343983514108,0.],[-39.997078444601307,-144.929056622845309,0.],[-40.0563347434709272,-146.136154841223203,0.],[-38.904007266421452,-148.63477947794189,0.],[-38.6997901766379471,-150.813273079104789,0.],[-36.9087133250309,-150.86075255299869,0.],[-35.7012456135060532,-151.75062019370489,0.],[-34.4347733975106394,-152.454443776277913,0.],[-33.3098545641378578,-153.289027396264913,0.],[-30.8084061238573206,-154.041660623798407,0.],[-28.6753564023615084,-154.229555900871702,0.],[-27.2744167012731715,-154.154379081159192,0.],[-26.1457257963793,-154.206453123873189,0.],[-24.9895668781623712,-154.376758846564911,0.],[-24.3212444212907712,-153.940600075206504,0.],[-23.1365663565342103,-153.647240839469788,0.],[-21.7377477961118402,-153.279744143952,0.],[-20.1052255608143504,-152.838518849203211,0.],[-20.0620098024542912,-151.422725920482094,0.],[-18.4199566855236689,-148.724878880322706,0.],[-16.7776358628279603,-146.347250112129103,0.],[-15.8338914191160391,-145.789246789427892,0.],[-15.4349631664700198,-145.720869978530288,0.],[-15.04734519997,-145.645763732409705,0.],[-14.6765338572029798,-145.564466049891394,0.],[-14.3804236477191694,-145.23867779270239,0.],[-13.2042930600061492,-144.425653107556798,0.],[-11.3972648486740091,-144.064832500354299,0.],[-9.95185995648834698,-144.165876957163505,0.]];
data_Paths.dwarfMinkeWhale_5 = [[-51.8347859175198522,-135.049397319625598,0.],[-46.9438609524285084,-137.368715286657391,0.],[-45.5461437947568,-138.548181286861,0.],[-43.2836069143352731,-140.372116711348895,0.],[-41.443559677331443,-143.420346834774193,0.],[-40.5814484462643819,-143.480901709942486,0.],[-39.8618819145410583,-145.195022124285487,0.],[-40.0678425956480666,-147.282001655985795,0.],[-39.3896633202577533,-148.51229699028741,0.],[-39.2129786379351231,-151.279550720608512,0.],[-36.5583371809250366,-151.907394369109312,0.],[-35.6467012806899,-151.956683376827897,0.],[-33.5468250549216265,-152.990441933527194,0.],[-31.5128506198423111,-153.827625238616889,0.],[-28.1511630605339498,-155.003639146131803,0.],[-26.1026741664556603,-154.563108826595908,0.],[-24.0759723378971309,-153.616882567476807,0.],[-22.1228729434940199,-153.598115400118502,0.],[-20.5117237515067288,-152.252838654915308,0.],[-19.7161384514078293,-151.240615627239691,0.],[-18.86352537222675,-148.581445057114308,0.],[-18.479517579249471,-147.867054679067394,0.],[-17.8505329139781104,-147.256755687924198,0.],[-17.3471950887424917,-146.886156883619492,0.]];
data_Paths.greenTurtle_3 = [[-7.10480376225081,-147.255067067974,0.],[-7.74883928447798542,-147.817799362159406,0.],[-7.95286323513372295,-148.137002102531113,0.],[-8.36218393503879298,-148.511548129379889,0.],[-8.69676666910820373,-148.595671017484591,0.],[-8.86348962455771883,-149.541698234044105,0.],[-9.30019814169234671,-149.627779435042612,0.],[-9.55186885162772548,-149.972395594525096,0.],[-9.70257344031898583,-150.184440624841386,0.],[-9.87889957989035494,-150.397040744687,0.],[-10.1528805574893504,-150.873444778046093,0.],[-10.4264104416855297,-151.350500657407,0.],[-10.7324096558978201,-151.514594355401186,0.],[-10.9511852875688103,-150.942052864468,0.],[-10.9189465146851,-149.969320599526611,0.],[-10.6685169666063402,-149.544601136054695,0.],[-10.5533592557421496,-148.726232151200605,0.],[-10.3567270926820107,-148.063249037860913,0.],[-10.1574051876014906,-147.504515302527807,0.],[-9.95206136179908718,-147.369961928221898,0.],[-9.38857209499674106,-146.806257753709,0.],[-8.95203271432815662,-146.294956451045294,0.],[-8.56321894045275478,-146.237535996510587,0.],[-8.61670365444870434,-145.916588133387393,0.],[-8.8781513408543109,-145.542249203575807,0.],[-9.55727854211316874,-144.949727068939211,0.],[-10.3667353419538504,-144.731088859485197,0.],[-11.1783131056392,-144.561552089417688,0.],[-12.1242153575132097,-144.439664570483814,0.],[-12.3631122646634601,-144.29698720722169,0.]];
data_Paths.greenTurtle_6 = [[-16.6309536205564683,-168.780715118051404,0.],[-17.2090013517502,-168.838947152460605,0.],[-17.3150076429304391,-168.34166429653709,0.],[-17.222707188336539,-167.555081985346902,0.],[-16.81018107661275,-166.940544438201,0.],[-16.3040997767330182,-166.598827096402403,0.],[-15.8893851652414693,-166.337840278,0.],[-15.2852160728512594,-166.093135359253608,0.],[-14.7100770265571494,-165.555646447534087,0.],[-13.6081072570534403,-163.755934230577196,0.],[-13.4560012994605493,-161.969095521506603,0.],[-12.7867257093252302,-160.732851537184899,0.],[-12.5747660098315102,-160.037990514619,0.],[-12.5062591698293,-158.884351928887696,0.],[-12.4196656293857206,-156.729327011242589,0.],[-12.7355755630977701,-155.734145311776302,0.],[-14.2300972134543695,-154.674784941134703,0.],[-16.2584420538098513,-153.701442520930414,0.],[-16.8415672379713897,-151.758736535964,0.],[-16.5405607310781591,-150.264511365194807,0.],[-15.1676214633818507,-149.819240667070886,0.],[-14.1320705194649,-149.444511014340094,0.],[-13.0328390802028107,-149.011303782038794,0.],[-11.81626940908418,-148.604694232852296,0.],[-11.2916790157271496,-148.079702593407205,0.],[-10.8761309000237301,-147.209962030686796,0.],[-10.5575465401309305,-146.276459161528408,0.],[-10.6795159529483605,-145.55272829197591,0.],[-11.12795436664085,-144.868803380563605,0.],[-11.9712647334644799,-144.682863463097192,0.],[-12.6672699626304492,-144.651577003150493,0.]];
data_Paths.allPaths = (function($this) {
	var $r;
	var _g = new haxe_ds_StringMap();
	{
		var value = data_Paths.greenTurtle_1;
		if(__map_reserved.greenTurtle_1 != null) _g.setReserved("greenTurtle_1",value); else _g.h["greenTurtle_1"] = value;
	}
	{
		var value1 = data_Paths.greenTurtle_4;
		if(__map_reserved.greenTurtle_4 != null) _g.setReserved("greenTurtle_4",value1); else _g.h["greenTurtle_4"] = value1;
	}
	{
		var value2 = data_Paths.dwarfMinkeWhale_4;
		if(__map_reserved.dwarfMinkeWhale_4 != null) _g.setReserved("dwarfMinkeWhale_4",value2); else _g.h["dwarfMinkeWhale_4"] = value2;
	}
	{
		var value3 = data_Paths.greenTurtle_7;
		if(__map_reserved.greenTurtle_7 != null) _g.setReserved("greenTurtle_7",value3); else _g.h["greenTurtle_7"] = value3;
	}
	{
		var value4 = data_Paths.dwarfMinkeWhale_2;
		if(__map_reserved.dwarfMinkeWhale_2 != null) _g.setReserved("dwarfMinkeWhale_2",value4); else _g.h["dwarfMinkeWhale_2"] = value4;
	}
	{
		var value5 = data_Paths.greenTurtle_5;
		if(__map_reserved.greenTurtle_5 != null) _g.setReserved("greenTurtle_5",value5); else _g.h["greenTurtle_5"] = value5;
	}
	{
		var value6 = data_Paths.dwarfMinkeWhale_3;
		if(__map_reserved.dwarfMinkeWhale_3 != null) _g.setReserved("dwarfMinkeWhale_3",value6); else _g.h["dwarfMinkeWhale_3"] = value6;
	}
	{
		var value7 = data_Paths.greenTurtle_2;
		if(__map_reserved.greenTurtle_2 != null) _g.setReserved("greenTurtle_2",value7); else _g.h["greenTurtle_2"] = value7;
	}
	{
		var value8 = data_Paths.dwarfMinkeWhale_1;
		if(__map_reserved.dwarfMinkeWhale_1 != null) _g.setReserved("dwarfMinkeWhale_1",value8); else _g.h["dwarfMinkeWhale_1"] = value8;
	}
	{
		var value9 = data_Paths.dwarfMinkeWhale_5;
		if(__map_reserved.dwarfMinkeWhale_5 != null) _g.setReserved("dwarfMinkeWhale_5",value9); else _g.h["dwarfMinkeWhale_5"] = value9;
	}
	{
		var value10 = data_Paths.greenTurtle_3;
		if(__map_reserved.greenTurtle_3 != null) _g.setReserved("greenTurtle_3",value10); else _g.h["greenTurtle_3"] = value10;
	}
	{
		var value11 = data_Paths.greenTurtle_6;
		if(__map_reserved.greenTurtle_6 != null) _g.setReserved("greenTurtle_6",value11); else _g.h["greenTurtle_6"] = value11;
	}
	$r = _g;
	return $r;
}(this));
data_Paths.main();
})(typeof window != "undefined" ? window : exports);