const searchPage = document.getElementById("searchPage");
const detailPage = document.getElementById("detailPage");

const moviesDiv =
document.getElementById("movies");

let personMovies = [];      // 全作品
let currentResults = [];    // 現在表示中

let currentPersonPage = 1;
let currentPersonName = "";
let isPersonSearch = false;

const API_KEY = "11098d35652f534fcb8f75ad72907603";

let currentMovieId = null;

const aiRatings = {

475557: { violence: 5, sexual: 2, gore: 3 }, // Joker

27205: { violence: 4, sexual: 1, gore: 2 }, // Inception

157336: { violence: 4, sexual: 1, gore: 2 }, // Interstellar

155: { violence: 4, sexual: 1, gore: 2 }, // The Dark Knight

680: { violence: 5, sexual: 3, gore: 4 }, // Pulp Fiction

13: { violence: 2, sexual: 2, gore: 1 }, // Forrest Gump

597: { violence: 2, sexual: 3, gore: 2 }, // Titanic

603: { violence: 4, sexual: 1, gore: 2 }, // The Matrix

278: { violence: 2, sexual: 1, gore: 1 }, // Shawshank Redemption

19995: { violence: 3, sexual: 1, gore: 1 }, // Avatar

550: { violence: 5, sexual: 3, gore: 3 }, // Fight Club

238: { violence: 4, sexual: 2, gore: 2 }, // The Godfather

424: { violence: 5, sexual: 1, gore: 4 }, // Schindler's List

857: { violence: 5, sexual: 1, gore: 4 }, // Saving Private Ryan

1891: { violence: 4, sexual: 1, gore: 2 }, // The Empire Strikes Back

11: { violence: 3, sexual: 1, gore: 1 }, // Star Wars

120: { violence: 4, sexual: 1, gore: 2 }, // The Lord of the Rings

121: { violence: 4, sexual: 1, gore: 2 }, // The Two Towers

122: { violence: 4, sexual: 1, gore: 2 }, // The Return of the King

272: { violence: 4, sexual: 2, gore: 2 }, // Batman Begins

49026: { violence: 4, sexual: 1, gore: 2 }, // The Dark Knight Rises

1892: { violence: 5, sexual: 1, gore: 4 }, // Return of the Jedi

807: { violence: 5, sexual: 2, gore: 4 }, // Se7en

694: { violence: 5, sexual: 2, gore: 5 }, // The Shining

578: { violence: 5, sexual: 2, gore: 4 }, // Jaws

85: { violence: 4, sexual: 1, gore: 2 }, // Raiders of the Lost Ark

603692: { violence: 5, sexual: 2, gore: 4 }, // John Wick: Chapter 4

76341: { violence: 5, sexual: 1, gore: 4 }, // Mad Max: Fury Road

24428: { violence: 4, sexual: 1, gore: 2 }, // The Avengers

299534: { violence: 4, sexual: 1, gore: 2 }, // Avengers: Endgame

129: { violence: 2, sexual: 1, gore: 1 }, // 千と千尋の神隠し

128: { violence: 5, sexual: 1, gore: 3 }, // もののけ姫

4935: { violence: 3, sexual: 1, gore: 1 }, // ハウルの動く城

10515: { violence: 3, sexual: 1, gore: 1 }, // 天空の城ラピュタ

81: { violence: 4, sexual: 1, gore: 2 }, // 風の谷のナウシカ

16859: { violence: 1, sexual: 1, gore: 1 }, // 魔女の宅急便

8392: { violence: 1, sexual: 1, gore: 1 }, // となりのトトロ

11621: { violence: 2, sexual: 1, gore: 1 }, // 紅の豚

12429: { violence: 1, sexual: 1, gore: 1 }, // 崖の上のポニョ

37797: { violence: 1, sexual: 1, gore: 1 }, // 耳をすませば

671: { violence: 2, sexual: 1, gore: 1 }, // ハリー・ポッターと賢者の石

672: { violence: 2, sexual: 1, gore: 1 }, // ハリー・ポッターと秘密の部屋

673: { violence: 3, sexual: 1, gore: 1 }, // ハリー・ポッターとアズカバンの囚人

674: { violence: 3, sexual: 1, gore: 2 }, // ハリー・ポッターと炎のゴブレット

675: { violence: 4, sexual: 1, gore: 2 }, // ハリー・ポッターと不死鳥の騎士団

767: { violence: 4, sexual: 1, gore: 2 }, // ハリー・ポッターと謎のプリンス

12444: { violence: 4, sexual: 1, gore: 2 }, // 死の秘宝 PART1

12445: { violence: 5, sexual: 1, gore: 3 }, // 死の秘宝 PART2

259316: { violence: 3, sexual: 1, gore: 1 }, // ファンタスティック・ビースト

338952: { violence: 4, sexual: 1, gore: 2 }, // ファンタスティック・ビーストと黒い魔法使いの誕生

338953: { violence: 4, sexual: 1, gore: 2 }, // ファンタスティック・ビーストとダンブルドアの秘密

1726: { violence: 4, sexual: 3, gore: 2 }, // Iron Man

1724: { violence: 4, sexual: 1, gore: 2 }, // The Incredible Hulk

10138: { violence: 4, sexual: 1, gore: 2 }, // Iron Man 2

10195: { violence: 4, sexual: 1, gore: 2 }, // Thor

1771: { violence: 4, sexual: 1, gore: 2 }, // Captain America: The First Avenger

24428: { violence: 4, sexual: 1, gore: 2 }, // The Avengers

68721: { violence: 4, sexual: 1, gore: 2 }, // Iron Man 3

76338: { violence: 4, sexual: 1, gore: 2 }, // Thor: The Dark World

100402: { violence: 4, sexual: 1, gore: 2 }, // Captain America: The Winter Soldier

99861: { violence: 4, sexual: 1, gore: 2 }, // Avengers: Age of Ultron

271110: { violence: 4, sexual: 1, gore: 2 }, // Captain America: Civil War

284053: { violence: 4, sexual: 1, gore: 2 }, // Thor: Ragnarok

299536: { violence: 4, sexual: 1, gore: 3 }, // Avengers: Infinity War

299534: { violence: 4, sexual: 1, gore: 3 }, // Avengers: Endgame

616037: { violence: 4, sexual: 1, gore: 2 }, // Thor: Love and Thunder

822119: { violence: 4, sexual: 1, gore: 2 }, // Captain America: Brave New World

118340: { violence: 4, sexual: 1, gore: 2 }, // Guardians of the Galaxy

102899: { violence: 3, sexual: 1, gore: 1 }, // Ant-Man

284052: { violence: 4, sexual: 1, gore: 2 }, // Doctor Strange

283995: { violence: 4, sexual: 1, gore: 2 }, // Guardians of the Galaxy Vol. 2

315635: { violence: 4, sexual: 1, gore: 2 }, // Spider-Man: Homecoming

284054: { violence: 4, sexual: 1, gore: 2 }, // Black Panther

363088: { violence: 3, sexual: 1, gore: 1 }, // Ant-Man and the Wasp

299537: { violence: 4, sexual: 1, gore: 2 }, // Captain Marvel

429617: { violence: 4, sexual: 1, gore: 2 }, // Spider-Man: Far From Home

497698: { violence: 4, sexual: 1, gore: 2 }, // Black Widow

566525: { violence: 4, sexual: 1, gore: 2 }, // Shang-Chi and the Legend of the Ten Rings

524434: { violence: 4, sexual: 1, gore: 2 }, // Eternals

634649: { violence: 4, sexual: 1, gore: 2 }, // Spider-Man: No Way Home

453395: { violence: 4, sexual: 1, gore: 3 }, // Doctor Strange in the Multiverse of Madness

505642: { violence: 4, sexual: 1, gore: 2 }, // Black Panther: Wakanda Forever

640146: { violence: 4, sexual: 1, gore: 2 }, // Ant-Man and the Wasp: Quantumania

447365: { violence: 4, sexual: 1, gore: 3 }, // Guardians of the Galaxy Vol. 3

609681: { violence: 4, sexual: 1, gore: 2 }, // The Marvels

533535: { violence: 5, sexual: 3, gore: 5 }, // Deadpool & Wolverine

986056: { violence: 4, sexual: 1, gore: 2 }, // Thunderbolts*

617126: { violence: 4, sexual: 1, gore: 2 }, // The Fantastic Four: First Steps

557: { violence: 3, sexual: 2, gore: 1 }, // Spider-Man (2002)

558: { violence: 3, sexual: 2, gore: 1 }, // Spider-Man 2

559: { violence: 4, sexual: 2, gore: 1 }, // Spider-Man 3

1930: { violence: 4, sexual: 2, gore: 1 }, // The Amazing Spider-Man

102382: { violence: 4, sexual: 2, gore: 1 }, // The Amazing Spider-Man 2

324857: { violence: 3, sexual: 1, gore: 1 }, // Spider-Man: Into the Spider-Verse

569094: { violence: 3, sexual: 1, gore: 1 }, // Spider-Man: Across the Spider-Verse

245891: { violence: 5, sexual: 1, gore: 4 }, // John Wick

324552: { violence: 5, sexual: 1, gore: 4 }, // John Wick: Chapter 2

458156: { violence: 5, sexual: 1, gore: 5 }, // John Wick: Chapter 3 - Parabellum

603692: { violence: 5, sexual: 1, gore: 4 }, // John Wick: Chapter 4

541671: { violence: 5, sexual: 1, gore: 4 }, // Ballerina

933260: { violence: 5, sexual: 4, gore: 5 }, // The Substance

// Mission: Impossible

954: { violence: 4, sexual: 1, gore: 2 }, // Mission: Impossible

955: { violence: 4, sexual: 2, gore: 2 }, // Mission: Impossible 2

956: { violence: 4, sexual: 1, gore: 2 }, // Mission: Impossible III

56292: { violence: 4, sexual: 1, gore: 2 }, // Ghost Protocol

177677: { violence: 4, sexual: 1, gore: 2 }, // Rogue Nation

353081: { violence: 4, sexual: 1, gore: 2 }, // Fallout

575264: { violence: 4, sexual: 1, gore: 2 }, // Dead Reckoning

575265: { violence: 4, sexual: 1, gore: 2 }, // The Final Reckoning

// Fast & Furious

9799: { violence: 3, sexual: 2, gore: 1 }, // The Fast and the Furious

584: { violence: 3, sexual: 2, gore: 1 }, // 2 Fast 2 Furious

9615: { violence: 3, sexual: 2, gore: 1 }, // Tokyo Drift

13804: { violence: 4, sexual: 2, gore: 1 }, // Fast & Furious

51497: { violence: 4, sexual: 2, gore: 1 }, // Fast Five

82992: { violence: 4, sexual: 2, gore: 1 }, // Fast & Furious 6

168259: { violence: 4, sexual: 2, gore: 1 }, // Furious 7

337339: { violence: 4, sexual: 2, gore: 1 }, // The Fate of the Furious

385128: { violence: 4, sexual: 2, gore: 1 }, // F9

385687: { violence: 4, sexual: 2, gore: 1 }, // Fast X

384018: { violence: 4, sexual: 2, gore: 1 }, // Hobbs & Shaw

325358: { violence: 3, sexual: 3, gore: 1 }, // ワイルドなスピード！ AHO MISSION

1893: { violence: 3, sexual: 1, gore: 1 }, // Star Wars Episode I: The Phantom Menace

1894: { violence: 3, sexual: 1, gore: 1 }, // Star Wars Episode II: Attack of the Clones

1895: { violence: 4, sexual: 1, gore: 2 }, // Star Wars Episode III: Revenge of the Sith

140607: { violence: 4, sexual: 1, gore: 2 }, // The Force Awakens

181808: { violence: 4, sexual: 1, gore: 2 }, // The Last Jedi

181812: { violence: 4, sexual: 1, gore: 2 }, // The Rise of Skywalker

330459: { violence: 4, sexual: 1, gore: 2 }, // Rogue One

348350: { violence: 3, sexual: 1, gore: 1 }, // Solo

329: { violence: 4, sexual: 1, gore: 2 }, // Jurassic Park

330: { violence: 4, sexual: 1, gore: 2 }, // The Lost World: Jurassic Park

331: { violence: 4, sexual: 1, gore: 2 }, // Jurassic Park III

135397: { violence: 4, sexual: 1, gore: 2 }, // Jurassic World

351286: { violence: 4, sexual: 1, gore: 3 }, // Jurassic World: Fallen Kingdom

507086: { violence: 4, sexual: 1, gore: 2 }, // Jurassic World Dominion

1234821: { violence: 4, sexual: 1, gore: 2 }, // Jurassic World Rebirth（復活の大地）

49051: { violence: 4, sexual: 1, gore: 2 }, // The Hobbit: An Unexpected Journey

57158: { violence: 4, sexual: 1, gore: 2 }, // The Hobbit: The Desolation of Smaug

122917: { violence: 4, sexual: 1, gore: 2 }, // The Hobbit: The Battle of the Five Armies

36557: { violence: 4, sexual: 3, gore: 2 }, // Casino Royale

10764: { violence: 4, sexual: 3, gore: 2 }, // Quantum of Solace

37724: { violence: 4, sexual: 3, gore: 2 }, // Skyfall

206647: { violence: 4, sexual: 3, gore: 2 }, // Spectre

370172: { violence: 4, sexual: 3, gore: 2 }, // No Time to Die

872585: { violence: 2, sexual: 4, gore: 1 }, // Oppenheimer

// Terminator

218: { violence: 4, sexual: 2, gore: 3 }, // The Terminator

280: { violence: 5, sexual: 2, gore: 3 }, // Terminator 2: Judgment Day

296: { violence: 4, sexual: 1, gore: 2 }, // Terminator 3: Rise of the Machines

534: { violence: 4, sexual: 1, gore: 2 }, // Terminator Salvation

87101: { violence: 4, sexual: 1, gore: 2 }, // Terminator Genisys

290859: { violence: 4, sexual: 1, gore: 2 }, // Terminator: Dark Fate

// Back to the Future

105: { violence: 2, sexual: 2, gore: 1 }, // Back to the Future

165: { violence: 2, sexual: 2, gore: 1 }, // Back to the Future Part II

196: { violence: 2, sexual: 2, gore: 1 }, // Back to the Future Part III

// Top Gun

744: { violence: 3, sexual: 3, gore: 1 }, // Top Gun

361743: { violence: 3, sexual: 3, gore: 1 }, // Top Gun: Maverick

36278: { violence: 2, sexual: 2, gore: 1 }, // Top Dog

// Alien

348: { violence: 5, sexual: 1, gore: 5 }, // Alien

679: { violence: 5, sexual: 1, gore: 5 }, // Aliens

8077: { violence: 5, sexual: 1, gore: 5 }, // Alien 3

8078: { violence: 5, sexual: 1, gore: 5 }, // Alien Resurrection

70981: { violence: 5, sexual: 1, gore: 5 }, // Prometheus

126889: { violence: 5, sexual: 1, gore: 5 }, // Alien: Covenant

945961: { violence: 5, sexual: 1, gore: 5 }, // Alien: Romulus

// 300

1271: { violence: 5, sexual: 2, gore: 5 }, // 300

53182: { violence: 5, sexual: 2, gore: 4 }, // 300: Rise of an Empire

497: { violence: 2, sexual: 1, gore: 1 }, // The Green Mile

274: { violence: 4, sexual: 2, gore: 2 }, // The Silence of the Lambs

98: { violence: 5, sexual: 2, gore: 4 }, // Gladiator

558449: { violence: 5, sexual: 2, gore: 4 }, // Gladiator II

745: { violence: 2, sexual: 1, gore: 2 }, // The Sixth Sense

37165: { violence: 1, sexual: 1, gore: 1 }, // The Truman Show

1124: { violence: 3, sexual: 2, gore: 1 }, // The Prestige

244786: { violence: 2, sexual: 2, gore: 1 }, // Whiplash

106646: { violence: 3, sexual: 5, gore: 2 }, // The Wolf of Wall Street

414906: { violence: 5, sexual: 2, gore: 3 }, // The Batman

// The Conjuring Universe

138843: { violence: 4, sexual: 1, gore: 2 }, // The Conjuring

259693: { violence: 4, sexual: 1, gore: 2 }, // The Conjuring 2

423108: { violence: 4, sexual: 1, gore: 2 }, // The Conjuring: The Devil Made Me Do It

1038392: { violence: 4, sexual: 1, gore: 2 }, // The Conjuring: Last Rites

439079: { violence: 4, sexual: 1, gore: 2 }, // The Nun

968051: { violence: 4, sexual: 1, gore: 2 }, // The Nun II

250546: { violence: 4, sexual: 1, gore: 2 }, // Annabelle

396422: { violence: 4, sexual: 1, gore: 2 }, // Annabelle: Creation

521029: { violence: 4, sexual: 1, gore: 2 }, // Annabelle Comes Home


// IT

346364: { violence: 5, sexual: 2, gore: 4 }, // IT

474350: { violence: 5, sexual: 2, gore: 4 }, // IT Chapter Two


// SAW

176: { violence: 5, sexual: 1, gore: 5 }, // Saw

215: { violence: 5, sexual: 1, gore: 5 }, // Saw II

214: { violence: 5, sexual: 1, gore: 5 }, // Saw III

663: { violence: 5, sexual: 1, gore: 5 }, // Saw IV

951491: { violence: 5, sexual: 1, gore: 5 }, // Saw X


// Other Horror

493922: { violence: 4, sexual: 2, gore: 4 }, // Hereditary

530385: { violence: 4, sexual: 4, gore: 4 }, // Midsommar

882598: { violence: 4, sexual: 1, gore: 3 }, // Smile

1100782: { violence: 4, sexual: 1, gore: 3 }, // Smile 2

565: { violence: 4, sexual: 1, gore: 2 }, // The Ring (2002)

10320: { violence: 4, sexual: 1, gore: 2 }, // Rings / Ring関連（ID要確認）

1970: { violence: 4, sexual: 1, gore: 3 }, // The Grudge

9552: { violence: 4, sexual: 1, gore: 3 }, // The Exorcist

447332: { violence: 4, sexual: 1, gore: 2 }, // A Quiet Place

520763: { violence: 4, sexual: 1, gore: 2 }, // A Quiet Place Part II

762441: { violence: 4, sexual: 1, gore: 2 }, // A Quiet Place: Day One

// Batman

268: { violence: 4, sexual: 2, gore: 2 }, // Batman (1989)

364: { violence: 4, sexual: 2, gore: 2 }, // Batman Returns

272: { violence: 4, sexual: 1, gore: 2 }, // Batman Begins


// DCEU

49521: { violence: 4, sexual: 2, gore: 2 }, // Man of Steel

209112: { violence: 4, sexual: 2, gore: 2 }, // Batman v Superman

297761: { violence: 4, sexual: 3, gore: 2 }, // Suicide Squad

436969: { violence: 5, sexual: 3, gore: 3 }, // The Suicide Squad

297762: { violence: 4, sexual: 2, gore: 2 }, // Wonder Woman

464052: { violence: 4, sexual: 2, gore: 2 }, // Wonder Woman 1984

141052: { violence: 4, sexual: 1, gore: 2 }, // Justice League

297802: { violence: 4, sexual: 2, gore: 2 }, // Aquaman

572802: { violence: 4, sexual: 2, gore: 2 }, // Aquaman and the Lost Kingdom

287947: { violence: 3, sexual: 1, gore: 1 }, // Shazam!

594767: { violence: 3, sexual: 1, gore: 1 }, // Shazam! Fury of the Gods

495764: { violence: 4, sexual: 3, gore: 2 }, // Birds of Prey

298618: { violence: 4, sexual: 2, gore: 2 }, // The Flash

565770: { violence: 3, sexual: 1, gore: 1 }, // Blue Beetle

1061474: { violence: 4, sexual: 1, gore: 2 }, // Superman (2025)

889737: { violence: 4, sexual: 2, gore: 2 }, // Joker: Folie à Deux

// 新海誠

372058: { violence: 2, sexual: 1, gore: 1 }, // Your Name.

568160: { violence: 2, sexual: 1, gore: 1 }, // Weathering with You

916224: { violence: 3, sexual: 1, gore: 2 }, // Suzume


// ジブリ

508863: { violence: 3, sexual: 1, gore: 1 }, // The Boy and the Heron


// 鬼滅の刃

635302: { violence: 5, sexual: 1, gore: 4 }, // Mugen Train

1321031: { violence: 5, sexual: 1, gore: 4 }, // Infinity Castle


// Christopher Nolan

77: { violence: 3, sexual: 1, gore: 1 }, // Memento

320: { violence: 3, sexual: 1, gore: 1 }, // Insomnia

374720: { violence: 5, sexual: 1, gore: 4 }, // Dunkirk

577922: { violence: 4, sexual: 2, gore: 2 }, // Tenet

11660: { violence: 2, sexual: 1, gore: 1 }, // Following


// Disney

109445: { violence: 2, sexual: 1, gore: 1 }, // Frozen

330457: { violence: 2, sexual: 1, gore: 1 }, // Frozen II

277834: { violence: 2, sexual: 1, gore: 1 }, // Moana

1241982: { violence: 2, sexual: 1, gore: 1 }, // Moana 2

269149: { violence: 2, sexual: 1, gore: 1 }, // Zootopia

1084242: { violence: 2, sexual: 1, gore: 1 }, // Zootopia 2


// Stephen King

1700: { violence: 4, sexual: 1, gore: 2 }, // Misery

501170: { violence: 5, sexual: 2, gore: 4 }, // Doctor Sleep


// A24

545611: { violence: 4, sexual: 2, gore: 3 }, // Everything Everywhere All at Once

929590: { violence: 5, sexual: 2, gore: 4 }, // Civil War

1008042: { violence: 4, sexual: 1, gore: 4 }, // Talk to Me

949423: { violence: 5, sexual: 4, gore: 4 }, // Pearl

760104: { violence: 5, sexual: 4, gore: 4 }, // X

303991: { violence: 2, sexual: 1, gore: 1 }, // 雨の日は会えない、晴れた日は君を想う

242582: { violence: 3, sexual: 2, gore: 2 }, // ナイトクローラー

45612: { violence: 3, sexual: 1, gore: 2 }, // ミッション:8ミニッツ

146233: { violence: 5, sexual: 1, gore: 4 }, // プリズナーズ

523638: { violence: 5, sexual: 3, gore: 4 }, // プリズナーズ・オブ・ゴーストランド

1122573: { violence: 5, sexual: 1, gore: 3 }, // グレイ・ミッション

359410: { violence: 5, sexual: 2, gore: 4 }, // ロードハウス

1949: { violence: 4, sexual: 1, gore: 2 }, // ゾディアック

9549: { violence: 4, sexual: 2, gore: 2 }, // プリンス・オブ・ペルシャ

77016: { violence: 5, sexual: 2, gore: 4 }, // エンド・オブ・ウォッチ

181886: { violence: 4, sexual: 3, gore: 2 }, // 複製された男

142: { violence: 2, sexual: 4, gore: 1 }, // ブロークバック・マウンテン

43347: { violence: 1, sexual: 4, gore: 1 }, // ラブ & ドラッグ

307081: { violence: 5, sexual: 2, gore: 3 }, // サウスポー

395992: { violence: 4, sexual: 1, gore: 4 }, // ライフ

7445: { violence: 4, sexual: 2, gore: 3 }, // マイ・ブラザー

435: { violence: 2, sexual: 1, gore: 1 }, // デイ・アフター・トゥモロー

141: { violence: 3, sexual: 2, gore: 2 }, // ドニー・ダーコ

882569: { violence: 5, sexual: 1, gore: 3 }, // コヴェナント／約束の救出

877269: { violence: 2, sexual: 1, gore: 1 }, // ストレンジ・ワールド／もうひとつの世界

45612: { violence: 3, sexual: 2, gore: 2 }, // ミッション：8ミニッツ

13466: { violence: 1, sexual: 1, gore: 1 }, // October Sky

254128: { violence: 4, sexual: 1, gore: 2 }, // カリフォルニア・ダウン

1241982: { violence: 2, sexual: 1, gore: 1 }, // モアナと伝説の海2

1734: { violence: 4, sexual: 2, gore: 2 }, // ハムナプトラ2 黄金のピラミッド

427641: { violence: 4, sexual: 1, gore: 3 }, // ランペイジ 巨獣大乱闘

451048: { violence: 3, sexual: 2, gore: 1 }, // ジャングル・クルーズ

353486: { violence: 3, sexual: 2, gore: 1 }, // ジュマンジ／ウェルカム・トゥ・ジャングル

447200: { violence: 4, sexual: 1, gore: 2 }, // スカイスクレイパー

436270: { violence: 4, sexual: 2, gore: 2 }, // ブラックアダム

512200: { violence: 3, sexual: 2, gore: 1 }, // ジュマンジ／ネクスト・レベル

550988: { violence: 3, sexual: 2, gore: 2 }, // フリー・ガイ

339846: { violence: 2, sexual: 4, gore: 1 }, // ベイウォッチ

845781: { violence: 2, sexual: 1, gore: 1 }, // レッド・ワン

184315: { violence: 4, sexual: 2, gore: 3 }, // ヘラクレス

10159: { violence: 3, sexual: 2, gore: 2 }, // ランダウン ロッキング・ザ・アマゾン

181812: { violence: 4, sexual: 1, gore: 2 }, // DUNE／デューン 砂の惑星

693134: { violence: 5, sexual: 2, gore: 3 }, // デューン 砂の惑星 PART2

937287: { violence: 2, sexual: 4, gore: 1 }, // チャレンジャーズ

316029: { violence: 2, sexual: 2, gore: 1 }, // グレイテスト・ショーマン

379686: { violence: 2, sexual: 1, gore: 1 }, // スペース・プレイヤーズ

21316: { violence: 1, sexual: 1, gore: 1 }, // Pixie Hollow Games

446894: { violence: 2, sexual: 1, gore: 1 }, // スモールフット

20021: { violence: 2, sexual: 1, gore: 1 }, // Duck Duck Goose

77987: { violence: 1, sexual: 1, gore: 1 }, // フレネミーズ

16871: { violence: 1, sexual: 1, gore: 1 }, // Super Buddies

615667: { violence: 3, sexual: 5, gore: 1 }, // マルコム&マリー

280217: { violence: 1, sexual: 1, gore: 1 }, // ゾーイの秘密アプリ

27205: { violence: 4, sexual: 2, gore: 2 }, // インセプション

272: { violence: 4, sexual: 2, gore: 2 }, // バットマン ビギンズ

373571: { violence: 4, sexual: 1, gore: 2 }, // ゴジラ キング・オブ・モンスターズ

124905: { violence: 4, sexual: 1, gore: 2 }, // GODZILLA ゴジラ

616: { violence: 5, sexual: 2, gore: 3 }, // ラスト・サムライ

335988: { violence: 4, sexual: 1, gore: 2 }, // トランスフォーマー／最後の騎士王

11645: { violence: 5, sexual: 1, gore: 4 }, // 硫黄島からの手紙

670292: { violence: 4, sexual: 1, gore: 3 }, // ザ・クリエイター／創世者

91314: { violence: 4, sexual: 1, gore: 2 }, // トランスフォーマー／ロストエイジ

447404: { violence: 2, sexual: 1, gore: 1 }, // 名探偵ピカチュウ

399174: { violence: 2, sexual: 1, gore: 1 }, // 犬ヶ島

1904: { violence: 2, sexual: 4, gore: 1 }, // SAYURI

241257: { violence: 3, sexual: 2, gore: 2 }, // ダレン・シャン

592983: { violence: 2, sexual: 1, gore: 1 }, // Fukushima 50

22971: { violence: 4, sexual: 3, gore: 2 }, // シャンハイ

11826: { violence: 1, sexual: 2, gore: 1 }, // タンポポ

420818: { violence: 2, sexual: 1, gore: 1 }, // Kensuke's Kingdom

49013: { violence: 4, sexual: 2, gore: 2 }, // ガーディアンズ: 呪われた地下宮殿

334541: { violence: 1, sexual: 1, gore: 1 }, // 追憶の森

1027535: { violence: 5, sexual: 2, gore: 4 }, // ゴールデンカムイ

1238763: { violence: 4, sexual: 2, gore: 2 }, // アンダーニンジャ

577922: { violence: 4, sexual: 1, gore: 2 }, // キングダム

1272149: { violence: 5, sexual: 1, gore: 3 }, // キングダム 大将軍の帰還

371645: { violence: 1, sexual: 3, gore: 1 }, // オオカミ少女と黒王子

432117: { violence: 3, sexual: 2, gore: 2 }, // ジョジョの奇妙な冒険 ダイヤモンドは砕けない 第一章

987917: { violence: 5, sexual: 1, gore: 3 }, // キングダム 運命の炎

686422: { violence: 1, sexual: 2, gore: 1 }, // ヲタクに恋は難しい

347969: { violence: 1, sexual: 2, gore: 1 }, // orange -オレンジ-

612299: { violence: 3, sexual: 1, gore: 2 }, // 二ノ国

724089: { violence: 5, sexual: 1, gore: 4 }, // 狂武蔵

347128: { violence: 1, sexual: 3, gore: 1 }, // ヒロイン失格

900667: { violence: 5, sexual: 1, gore: 3 }, // キングダム2 遥かなる大地へ

456740: { violence: 2, sexual: 2, gore: 1 }, // 斉木楠雄のΨ難

406997: { violence: 2, sexual: 1, gore: 1 }, // 映画 妖怪ウォッチ 空飛ぶクジラとダブル世界の大冒険だニャン！

726208: { violence: 1, sexual: 1, gore: 1 }, // 夏への扉 ―キミのいる未来へ―

377275: { violence: 1, sexual: 2, gore: 1 }, // 四月は君の嘘

1017633: { violence: 4, sexual: 1, gore: 2 }, // 陰陽師0

68444: { violence: 4, sexual: 2, gore: 2 }, // BLEACH

768744: { violence: 3, sexual: 1, gore: 2 }, // 僕のヒーローアカデミア THE MOVIE ワールド ヒーローズ ミッション

565770: { violence: 1, sexual: 2, gore: 1 }, // 空の青さを知る人よ

547016: { violence: 4, sexual: 2, gore: 2 }, // 銀魂2 掟は破るためにこそある

661374: { violence: 4, sexual: 2, gore: 2 }, // 東京リベンジャーズ

121986: { violence: 3, sexual: 1, gore: 1 }, // 仮面ライダー×仮面ライダー ウィザード&フォーゼ MOVIE大戦アルティメイタム

432836: { violence: 4, sexual: 2, gore: 2 }, // 銀魂

293310: { violence: 1, sexual: 2, gore: 1 }, // アオハライド

121988: { violence: 3, sexual: 1, gore: 1 }, // 仮面ライダーフォーゼ THE MOVIE みんなで宇宙キターッ!

74627: { violence: 3, sexual: 1, gore: 1 }, // 仮面ライダー×仮面ライダー フォーゼ＆オーズ MOVIE大戦 MEGA MAX

470044: { violence: 2, sexual: 4, gore: 1 }, // リバーズ・エッジ
87290: { violence: 3, sexual: 1, gore: 1 }, // 仮面ライダー×スーパー戦隊 スーパーヒーロー大戦
508883: { violence: 3, sexual: 1, gore: 2 }, // 君たちはどう生きるか
382272: { violence: 4, sexual: 1, gore: 3 }, // デスノート Light up the NEW world
431819: { violence: 1, sexual: 2, gore: 1 }, // 打ち上げ花火、下から見るか？横から見るか？
410220: { violence: 2, sexual: 3, gore: 1 }, // 溺れるナイフ
349176: { violence: 3, sexual: 1, gore: 2 }, // 暗殺教室
188288: { violence: 3, sexual: 1, gore: 2 }, // 仮面ライダーW FOREVER AtoZ／運命のガイアメモリ
695932: { violence: 1, sexual: 3, gore: 1 }, // 花束みたいな恋をした
108515: { violence: 3, sexual: 1, gore: 2 }, // 仮面ライダー×仮面ライダー W＆ディケイド MOVIE大戦2010
30617: { violence: 3, sexual: 1, gore: 2 }, // 劇場版 仮面ライダーディケイド オールライダー対大ショッカー
519176: { violence: 4, sexual: 2, gore: 2 }, // 銀魂2 掟は破るためにこそある
792678: { violence: 4, sexual: 1, gore: 4 }, // CUBE 一度入ったら、最後
1244244: { violence: 4, sexual: 1, gore: 3 }, // Cloud クラウド
432985: { violence: 4, sexual: 2, gore: 2 }, // 銀魂
359628: { violence: 3, sexual: 1, gore: 2 }, // 暗殺教室 卒業編
808667: { violence: 5, sexual: 2, gore: 4 }, // キャラクター
188198: { violence: 3, sexual: 1, gore: 2 }, // 仮面ライダー×仮面ライダー フォーゼ＆オーズ MOVIE大戦 MEGA MAX
35069: { violence: 3, sexual: 1, gore: 2 }, // オーズ・電王・オールライダー レッツゴー仮面ライダー
10643: { violence: 4, sexual: 1, gore: 3 }, // ゴジラ2000 ミレニアム
114372: { violence: 5, sexual: 1, gore: 4 }, // 真救世主伝説 北斗の拳 ラオウ伝 激闘の章
25050: { violence: 1, sexual: 1, gore: 1 }, // 歩いても 歩いても
15003: { violence: 4, sexual: 1, gore: 3 }, // チョコレート・ファイター
374671: { violence: 1, sexual: 1, gore: 1 }, // 海よりもまだ深く
434221: { violence: 3, sexual: 2, gore: 2 }, // 空海－KU-KAI－美しき王妃の謎
109080: { violence: 5, sexual: 1, gore: 4 }, // 真救世主伝説 北斗の拳 ラオウ伝 殉愛の章
51550: { violence: 2, sexual: 1, gore: 1 }, // HERO
45438: { violence: 3, sexual: 2, gore: 2 }, // 東京攻略
27799: { violence: 1, sexual: 2, gore: 1 }, // 花とアリス
131739: { violence: 3, sexual: 1, gore: 3 }, // 聯合艦隊司令長官 山本五十六
16133: { violence: 4, sexual: 2, gore: 3 }, // SURVIVE STYLE5+
105231: { violence: 5, sexual: 1, gore: 4 }, // 真救世主伝説 北斗の拳 ZERO ケンシロウ伝
479034: { violence: 2, sexual: 1, gore: 2 }, // 祈りの幕が下りる時
79382: { violence: 1, sexual: 1, gore: 1 }, // 奇跡
297905: { violence: 2, sexual: 1, gore: 1 }, // “新参者”加賀恭一郎「眠りの森」
114370: { violence: 4, sexual: 1, gore: 3 }, // 真救世主伝説 北斗の拳 ユリア伝
114371: { violence: 4, sexual: 1, gore: 3 }, // 真救世主伝説 北斗の拳 トキ伝
122734: { violence: 2, sexual: 1, gore: 2 }, // 麒麟の翼 ～劇場版・新参者～
130023: { violence: 1, sexual: 1, gore: 1 }, // ステキな金縛り

575222: { violence: 2, sexual: 1, gore: 1 }, // 映画ドラえもん のび太の月面探査記
2517: { violence: 2, sexual: 1, gore: 1 }, // 誰も知らない
253451: { violence: 4, sexual: 1, gore: 3 }, // クローズ EXPLODE
403310: { violence: 3, sexual: 4, gore: 2 }, // HK／変態仮面 アブノーマル・クライシス
768147: { violence: 1, sexual: 1, gore: 1 }, // 浅草キッド
532267: { violence: 4, sexual: 1, gore: 3 }, // ザ・ファブル
40123: { violence: 3, sexual: 1, gore: 2 }, // Genius Party
141819: { violence: 5, sexual: 2, gore: 4 }, // 許されざる者
235919: { violence: 2, sexual: 1, gore: 1 }, // ガリレオXX 内海薫最後の事件 愚弄ぶ
382154: { violence: 5, sexual: 2, gore: 3 }, // ディストラクション・ベイビーズ
54579: { violence: 3, sexual: 2, gore: 3 }, // 戦慄迷宮3D
308471: { violence: 4, sexual: 3, gore: 3 }, // 闇金ウシジマくん Part2
698222: { violence: 3, sexual: 2, gore: 2 }, // 今日から俺は!! 劇場版
52588: { violence: 1, sexual: 1, gore: 1 }, // 包帯クラブ
545143: { violence: 2, sexual: 2, gore: 1 }, // 響 -HIBIKI-
382258: { violence: 2, sexual: 3, gore: 1 }, // ピンクとグレー
29975: { violence: 1, sexual: 3, gore: 1 }, // シュガー＆スパイス ～風味絶佳～
1553969: { violence: 2, sexual: 2, gore: 1 }, // 箱の中の羊
19486: { violence: 2, sexual: 3, gore: 1 }, // 僕の彼女はサイボーグ
19506: { violence: 4, sexual: 1, gore: 3 }, // ICHI
39544: { violence: 2, sexual: 1, gore: 1 }, // ホッタラケの島 ～遥と魔法の鏡～
990365: { violence: 4, sexual: 2, gore: 3 }, // レジェンド＆バタフライ
46361: { violence: 2, sexual: 2, gore: 1 }, // ザ・マジックアワー
28830: { violence: 1, sexual: 2, gore: 1 }, // おっぱいバレー
147999: { violence: 1, sexual: 1, gore: 1 }, // あなたへ
180891: { violence: 2, sexual: 2, gore: 2 }, // リアル〜完全なる首長竜の日〜
18733: { violence: 1, sexual: 1, gore: 1 }, // ハッピーフライト
1593275: { violence: 1, sexual: 1, gore: 1 }, // 人はなぜラブレターを書くのか
380246: { violence: 1, sexual: 2, gore: 1 }, // ギャラクシー街道
706566: { violence: 4, sexual: 2, gore: 2 }, // 劇場版 奥様は、取り扱い注意
33029: { violence: 4, sexual: 1, gore: 2 }, // 戦国自衛隊1549
315011: { violence: 5, sexual: 1, gore: 4 }, // シン・ゴジラ
295830: { violence: 5, sexual: 2, gore: 4 }, // 進撃の巨人 ATTACK ON TITAN
340382: { violence: 5, sexual: 2, gore: 5 }, // 進撃の巨人 ATTACK ON TITAN エンド オブ ザ ワールド
88557: { violence: 2, sexual: 1, gore: 1 }, // 劇場版ポケットモンスター ベストウイッシュ ビクティニと黒き英雄 ゼクロム
115223: { violence: 2, sexual: 1, gore: 1 }, // 劇場版ポケットモンスター ベストウイッシュ ビクティニと白き英雄 レシラム
74842: { violence: 4, sexual: 1, gore: 3 }, // 鬼神伝
140441: { violence: 3, sexual: 2, gore: 4 }, // 貞子3D
257527: { violence: 3, sexual: 2, gore: 4 }, // 貞子3D2
1276108: { violence: 2, sexual: 1, gore: 2 }, // ラストマイル
224560: { violence: 2, sexual: 3, gore: 2 }, // 人間失格
565241: { violence: 2, sexual: 1, gore: 1 }, // 氷点
461211: { violence: 4, sexual: 2, gore: 3 }, // 忍びの国
619162: { violence: 2, sexual: 1, gore: 1 }, // 決算！忠臣蔵
785534: { violence: 1, sexual: 1, gore: 1 }, // そして、バトンは渡された
436969: { violence: 3, sexual: 2, gore: 3 }, // MONSTERZ モンスターズ
315465: { violence: 3, sexual: 1, gore: 2 }, // バケモノの子
614587: { violence: 3, sexual: 1, gore: 2 }, // ルパン三世 THE FIRST
1101179: { violence: 1, sexual: 2, gore: 1 }, // 片思い世界
1337985: { violence: 1, sexual: 2, gore: 1 }, // 遠い山なみの光
447180: { violence: 1, sexual: 2, gore: 1 }, // 先生！、、、好きになってもいいですか？
669663: { violence: 2, sexual: 1, gore: 1 }, // 一度死んでみた
434775: { violence: 3, sexual: 2, gore: 2 }, // 三度目の殺人
434236: { violence: 1, sexual: 1, gore: 1 }, // チア☆ダン～女子高生がチアダンスで全米制覇しちゃったホントの話～
517065: { violence: 2, sexual: 2, gore: 1 }, // SUNNY 強い気持ち・強い愛
731015: { violence: 2, sexual: 1, gore: 2 }, // いのちの停車場
489891: { violence: 3, sexual: 1, gore: 2 }, // ラプラスの魔女
1370709: { violence: 1, sexual: 2, gore: 1 }, // アット・ザ・ベンチ
849786: { violence: 2, sexual: 3, gore: 2 }, // 流浪の月
1115577: { violence: 2, sexual: 2, gore: 1 }, // キリエのうた
408574: { violence: 2, sexual: 1, gore: 1 }, // ちはやふる 下の句
940721: { violence: 5, sexual: 1, gore: 4 }, // ゴジラ-1.0
604605: { violence: 2, sexual: 2, gore: 1 }, // HELLO WORLD
662638: { violence: 3, sexual: 1, gore: 2 }, // 名探偵コナン 緋色の弾丸
1340355: { violence: 4, sexual: 1, gore: 2 }, // アンダーニンジャ
1381071: { violence: 3, sexual: 1, gore: 2 }, // ゴジラ-0.0
433157: { violence: 2, sexual: 1, gore: 1 }, // ワンピース～ハート オブ ゴールド～
813477: { violence: 5, sexual: 1, gore: 3 }, // シン・仮面ライダー
1559123: { violence: 1, sexual: 1, gore: 1 }, // ほどなく、お別れです
449132: { violence: 1, sexual: 3, gore: 1 }, // 君の膵臓をたべたい
527281: { violence: 1, sexual: 2, gore: 1 }, // センセイ君主
433128: { violence: 5, sexual: 1, gore: 4 }, // 亜人
564251: { violence: 2, sexual: 2, gore: 1 }, // 映画 賭󠄀ケグルイ
624812: { violence: 1, sexual: 2, gore: 1 }, // 思い、思われ、ふり、ふられ
923837: { violence: 1, sexual: 2, gore: 1 }, // やがて海へと届く
991190: { violence: 2, sexual: 1, gore: 1 }, // 金の国 水の国
507612: { violence: 1, sexual: 2, gore: 1 }, // となりの怪物くん
742396: { violence: 3, sexual: 2, gore: 1 }, // 映画 賭󠄀ケグルイ 絶体絶命ロシアンルーレット
1317132: { violence: 2, sexual: 1, gore: 1 }, // 六人の嘘つきな大学生
672322: { violence: 5, sexual: 2, gore: 4 }, // るろうに剣心 最終章 The Beginning
602063: { violence: 5, sexual: 2, gore: 4 }, // るろうに剣心 最終章 The Final
242828: { violence: 2, sexual: 1, gore: 1 }, // 思い出のマーニー
1024621: { violence: 1, sexual: 2, gore: 1 }, // ちひろさん
276624: { violence: 5, sexual: 2, gore: 5 }, // アイアムアヒーロー
349498: { violence: 1, sexual: 1, gore: 1 }, // ビリギャル
592867: { violence: 3, sexual: 1, gore: 2 }, // ドラゴンクエスト ユア・ストーリー
1369010: { violence: 2, sexual: 1, gore: 1 }, // ブラック・ショーマン
455954: { violence: 4, sexual: 2, gore: 3 }, // 関ヶ原
482847: { violence: 2, sexual: 2, gore: 1 }, // 世にも奇妙な物語 25周年記念！秋の2週連続SP～傑作復活編～
526384: { violence: 1, sexual: 2, gore: 1 }, // コーヒーが冷めないうちに
379300: { violence: 3, sexual: 1, gore: 2 }, // 僕だけがいない街
821103: { violence: 1, sexual: 1, gore: 1 }, // バイプレイヤーズ もしも100人の名脇役が映画を作ったら
254304: { violence: 2, sexual: 2, gore: 1 }, // 女子ーズ
283831: { violence: 1, sexual: 2, gore: 1 }, // ストロボ・エッジ
472307: { violence: 1, sexual: 3, gore: 1 }, // ナラタージュ
1404791: { violence: 4, sexual: 1, gore: 3 }, // ドールハウス
634429: { violence: 5, sexual: 1, gore: 3 }, // シン・ウルトラマン
420426: { violence: 4, sexual: 1, gore: 3 }, // BLEACH
83389: { violence: 1, sexual: 1, gore: 1 }, // コクリコ坂から
602666: { violence: 3, sexual: 1, gore: 2 }, // 唐人街探偵 東京MISSION
15767: { violence: 5, sexual: 1, gore: 4 }, // ゴジラ ファイナルウォーズ
495925: { violence: 2, sexual: 1, gore: 1 }, // 映画ドラえもん のび太の宝島
698860: { violence: 4, sexual: 2, gore: 3 }, // MOTHER マザー
1469857: { violence: 2, sexual: 1, gore: 1 }, // おーい、応為
1451398: { violence: 4, sexual: 1, gore: 4 }, // カラダ探し THE LAST NIGHT
1122634: { violence: 3, sexual: 1, gore: 2 }, // 赤ずきん、旅の途中で死体と出会う。
991814: { violence: 4, sexual: 1, gore: 4 }, // カラダ探し
1511675: { violence: 5, sexual: 1, gore: 4 }, // キングダム 魂の決戦
1145291: { violence: 4, sexual: 1, gore: 3 }, // 禁じられた遊び
1001196: { violence: 1, sexual: 1, gore: 1 }, // 舞台『千と千尋の神隠し』
447185: { violence: 3, sexual: 1, gore: 1 }, // 斉木楠雄のΨ難
566387: { violence: 2, sexual: 2, gore: 2 }, // 十二人の死にたい子どもたち
1029486: { violence: 1, sexual: 1, gore: 1 }, // 湯道
378491: { violence: 3, sexual: 2, gore: 2 }, // セーラー服と機関銃 －卒業－
1718699: { violence: 2, sexual: 1, gore: 1 }, // Not Alone
1317288: { violence: 2, sexual: 2, gore: 1 }, // マーティ・シュプリーム 世界をつかめ
398818: { violence: 2, sexual: 3, gore: 1 }, // 君の名前で僕を呼んで
391713: { violence: 2, sexual: 2, gore: 1 }, // レディ・バード
331482: { violence: 2, sexual: 2, gore: 1 }, // ストーリー・オブ・マイライフ／わたしの若草物語
1170608: { violence: 4, sexual: 1, gore: 3 }, // デューン 砂の惑星 PART3
787699: { violence: 2, sexual: 1, gore: 1 }, // ウォンカとチョコレート工場のはじまり
646380: { violence: 2, sexual: 2, gore: 1 }, // ドント・ルック・アップ
661539: { violence: 2, sexual: 2, gore: 1 }, // 名もなき者／A COMPLETE UNKNOWN
1634949: { violence: 2, sexual: 1, gore: 1 }, // Lorne
791177: { violence: 5, sexual: 4, gore: 5 }, // ボーンズ アンド オール
384680: { violence: 4, sexual: 1, gore: 4 }, // 荒野の誓い
451915: { violence: 2, sexual: 2, gore: 1 }, // ビューティフル・ボーイ
504949: { violence: 5, sexual: 2, gore: 4 }, // キング
542178: { violence: 2, sexual: 2, gore: 1 } // フレンチ・ディスパッチ ザ・リバティ、カンザス・イヴニング・サン別冊




};

async function searchMovie(query) {

 const language =
 document.getElementById("language").value;

  const response = await fetch(
  `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=${language}&query=${encodeURIComponent(query)}`
);

  const data = await response.json();

  currentResults = data.results;

  moviesDiv.innerHTML = "";

const personResponse = await fetch(
`https://api.themoviedb.org/3/search/person?api_key=${API_KEY}&language=${language}&query=${encodeURIComponent(query)}`
);

const personData = await personResponse.json();

if (personData.results.length > 0){

const person = personData.results[0];

currentPersonPage = 1;
currentPersonName = person.name;

const creditsResponse = await fetch(
`https://api.themoviedb.org/3/person/${person.id}/movie_credits?api_key=${API_KEY}&language=${language}`
);

const creditsData = await creditsResponse.json();

personMovies = creditsData.cast
.sort((a,b)=>b.popularity-a.popularity);

currentResults = personMovies.slice(0,20);

isPersonSearch = true;

currentResults.forEach(movie=>{

if(!movie.poster_path) return;

moviesDiv.innerHTML += `
<div class="card movie-card" onclick="showMovie('${movie.id}')">

<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">

<h2>${movie.title}</h2>

<p style="color:#888;font-size:12px;">
${person.name}出演
</p>

<p>⭐ ${movie.vote_average.toFixed(1)} / 10</p>

<p>
📅 ${
movie.release_date
? movie.release_date.substring(0,4)
: "不明"
}
</p>

</div>
`;

});

if(personMovies.length>20){

moviesDiv.innerHTML+=`
<div style="text-align:center;margin:30px;">
<button id="loadMoreButton" onclick="loadMoreMovies()">
さらに見る
</button>
</div>
`;

}

return;

}
 
  data.results.slice(0,20).forEach(movie => {

 moviesDiv.innerHTML += `
  <div class="card movie-card" onclick="showMovie('${movie.id}')">

   <img
  src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
>

    <h2>${movie.title}</h2>

    <p style="color:#888;font-size:12px;">
ID: ${movie.id}
</p>

    <p>⭐ ${movie.vote_average.toFixed(1)} / 10</p>

    <p>
      📅 ${
        movie.release_date
          ? movie.release_date.substring(0,4)
          : "不明"
      }
    </p>

  </div>
`;

  });

}

function showSearchResults() {

 window.scrollTo(0,0);

detailPage.style.display = "none";
searchPage.style.display = "block";

  moviesDiv.innerHTML = "";

  currentResults.slice(0,20).forEach(movie => {

    moviesDiv.innerHTML += `
     <div class="card movie-card" onclick="showMovie('${movie.id}')">

      <img
  src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
>

        <h2>${movie.title}</h2>

        <p style="color:#888;font-size:12px;">
ID: ${movie.id}
</p>

        <p>⭐ ${movie.vote_average.toFixed(1)} / 10</p>

        <p>
          📅 ${
            movie.release_date
              ? movie.release_date.substring(0,4)
              : "不明"
          }
        </p>

      </div>
    `;
  });

}
async function showMovie(id){

 window.scrollTo(0,0);

currentMovieId = id;

searchPage.style.display = "none";
detailPage.style.display = "block";

 document.body.scrollTop = 0;
document.documentElement.scrollTop = 0;

detailPage.innerHTML = `
<div style="
padding:60px;
text-align:center;
font-size:20px;
">
🎬 読み込み中...
</div>
`;
 
  const language =
  document.getElementById("language").value;

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=${language}`
  );

  const movie = await response.json();

  const releaseResponse = await fetch(
  `https://api.themoviedb.org/3/movie/${id}/release_dates?api_key=${API_KEY}`
);

const releaseData = await releaseResponse.json();

const japanRelease =
  releaseData.results.find(
    r => r.iso_3166_1 === "JP"
  );

const certification =
  japanRelease?.release_dates?.[0]?.certification
  || "未登録";

const aiRating = aiRatings[id];

let ageRating = "評価データなし";

if (aiRating) {

  ageRating = "全年齢";

  // 18+
  if (
    aiRating.sexual >= 5 ||
    aiRating.gore >= 5
  ) {
    ageRating = "18+";
  }

  // 16+
  else if (
    aiRating.violence >= 5 ||
    aiRating.sexual >= 4 ||
    aiRating.gore >= 4
  ) {
    ageRating = "16+";
  }

  // 13+
  else if (
    aiRating.violence >= 3 ||
    aiRating.sexual >= 2 ||
    aiRating.gore >= 3
  ) {
    ageRating = "13+";
  }

}

let ageReason = "AI評価データなし";

if (aiRating) {

  ageReason = "";

  if (aiRating.violence >= 4) {
    ageReason += "💥 強い暴力表現あり<br>";
  }

  if (aiRating.sexual >= 3) {
    ageReason += "❤️ 中程度の性的表現あり<br>";
  }
  else if (aiRating.sexual >= 2) {
    ageReason += "❤️ 軽度の性的表現の可能性あり<br>";
  }

  if (aiRating.gore >= 4) {
    ageReason += "🩸 強いグロ表現あり<br>";
  }
  else if (aiRating.gore >= 2) {
    ageReason += "🩸 軽度のグロ表現あり<br>";
  }

  if (ageReason === "") {
    ageReason = "大きな注意表現はありません";
  }

}

  const savedRating = JSON.parse(
  localStorage.getItem("rating_" + id)
);

  const creditsResponse = await fetch(
  `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`
);

const credits = await creditsResponse.json();

const cast = credits.cast
  .slice(0,5)
  .map(actor => actor.name)
  .join(" / ");

const videosResponse = await fetch(
  `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
);

const videos = await videosResponse.json();

const trailer = videos.results.find(
  video =>
    video.site === "YouTube" &&
    video.type === "Trailer"
);
  
  const genres = movie.genres
  .map(g => g.name)
  .join(" / ");

searchPage.style.display = "none";
detailPage.style.display = "block";

detailPage.innerHTML = `
  <div class="card detail-card">

  <button onclick="showSearchResults()"
style="
padding:10px 15px;
border:none;
border-radius:8px;
margin-bottom:20px;
cursor:pointer;
">
← 検索に戻る
</button>

<div class="movie-top">

<img
src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
class="movie-poster"
>

<div class="movie-info">

  
<h1 style="margin-bottom:10px;">
${movie.title}
</h1>

<div class="scenecheck-box">

<h2>🔞 SceneCheck推奨年齢</h2>

<p class="scene-age">
${ageRating}
</p>

<p>
${ageReason}
</p>

<p style="font-size:12px;color:#999;">
※ SceneCheck独自基準
</p>

</div>

<div style="
display:flex;
flex-wrap:wrap;
gap:8px;
margin-bottom:15px;
font-size:14px;
">

<span>⭐ ${movie.vote_average.toFixed(1)}</span>

<span>⏱ ${movie.runtime}分</span>

<span>📅 ${movie.release_date?.substring(0,4) || "不明"}</span>

<span>🎭 ${genres}</span>

</div>

<p style="
font-weight:bold;
margin-bottom:15px;
">
🎟️ TMDBレーティング: ${certification}
</p>

<h3 style="margin-top:20px;">🤖 AI推定評価</h3>

${
aiRating
? `
<p style="font-size:18px; margin:10px 0;">
💥 ${aiRating.violence}/5　
❤️ ${aiRating.sexual}/5　
🩸 ${aiRating.gore}/5
</p>
`
:
`
<p style="color:#888;">
AI評価データなし
</p>
`
}

<hr style="margin:20px 0; border-color:#333;">

<div class="vote-box">
 
<h3>⚠️ SceneCheck評価</h3>

<p><strong>暴力表現</strong></p>
<select id="violence">
  <option>1 - ほぼなし</option>
  <option>2 - 少しあり</option>
  <option>3 - 普通</option>
  <option>4 - 強い</option>
  <option>5 - 非常に強い</option>
</select>

<br><br>

<p><strong>性的表現</strong></p>
<select id="sexual">
  <option>1 - ほぼなし</option>
  <option>2 - 軽いキスや下ネタ</option>
  <option>3 - 露出またはベッドシーン示唆</option>
  <option>4 - 明確な性描写</option>
  <option>5 - 非常に露骨</option>
</select>

<br><br>

<p><strong>グロ表現</strong></p>
<select id="gore">
  <option>1 - なし</option>
  <option>2 - 軽い流血</option>
  <option>3 - 傷や死体が見える</option>
  <option>4 - 内臓・切断描写あり</option>
  <option>5 - 非常に生々しい</option>
</select>

<br><br>

<button onclick="submitRating()">
  評価を送信
</button>

<div id="ratingResult" style="margin-top:20px;">
${
savedRating
? `
<h3>あなたの評価</h3>
<p>💥 暴力表現: ${savedRating.violence}</p>
<p>❤️ 性的表現: ${savedRating.sexual}</p>
<p>🩸 グロ表現: ${savedRating.gore}</p>
`
: ""
}
</div>

</div>
 
    <hr style="margin:20px 0; border-color:#333;">

    ${trailer ? `
<p style="margin-top:20px;">
<a
href="https://www.youtube.com/watch?v=${trailer.key}"
target="_blank"
style="
display:inline-block;
padding:10px 15px;
background:#e50914;
color:white;
text-decoration:none;
border-radius:8px;
"
>
▶ 予告編を見る
</a>
</p>
` : ""}

   <details style="margin-top:15px;">

<summary style="cursor:pointer;font-size:18px;">
🎭 出演者
</summary>

<p style="margin-top:15px;">
${cast}
</p>

</details>

  <details style="margin-top:20px;">

<summary style="cursor:pointer;font-size:18px;">
📖 あらすじ
</summary>

<p style="margin-top:15px;line-height:1.7;">
${movie.overview || "あらすじなし"}
</p>

</details>

   <details style="margin-top:20px;">

<summary style="cursor:pointer;font-size:18px;">
📚 詳細情報
</summary>

<p>🌍 ${movie.production_countries.map(c => c.name).join(" / ")}</p>

<p>🏢 ${movie.production_companies.map(c => c.name).join(" / ")}</p>

<p>
💰 ${
movie.budget
? "$" + movie.budget.toLocaleString()
: "不明"
}
</p>

</details>

</div>

</div> <!-- movie-info -->

</div> <!-- movie-top -->

</div> <!-- card -->
`;

 moviesDiv.innerHTML = "";

}

function submitRating() {

const violence =
document.getElementById("violence").selectedIndex + 1;

const sexual =
document.getElementById("sexual").selectedIndex + 1;

const gore =
document.getElementById("gore").selectedIndex + 1;

document.getElementById("ratingResult").innerHTML = `
 
`;

localStorage.setItem(
  "rating_" + currentMovieId,
  JSON.stringify({
    violence,
    sexual,
    gore
  })
);

}

function loadMoreMovies(){

currentPersonPage++;

const start=(currentPersonPage-1)*20;
const end=start+20;

const more=personMovies.slice(start,end);

more.forEach(movie=>{

if(!movie.poster_path) return;

moviesDiv.innerHTML+=`
<div class="card movie-card" onclick="showMovie('${movie.id}')">

<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">

<h2>${movie.title}</h2>

<p style="color:#888;font-size:12px;">
${currentPersonName}出演
</p>

<p>⭐ ${movie.vote_average.toFixed(1)} / 10</p>

<p>📅 ${movie.release_date ? movie.release_date.substring(0,4) : "不明"}</p>

</div>
`;

});

const btn=document.querySelector("#loadMoreButton");

if(btn) btn.parentElement.remove();

if(personMovies.length>end){

moviesDiv.innerHTML+=`
<div style="text-align:center;margin:30px;">
<button id="loadMoreButton" onclick="loadMoreMovies()">
さらに見る
</button>
</div>
`;

}

}

document
  .getElementById("search")
  .addEventListener("input", (e) => {

    const query = e.target.value.trim();

    if (query.length < 2) {
      currentResults = [];
      moviesDiv.innerHTML = "";
      return;
    }

    searchMovie(query);

  });
