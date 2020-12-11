-- MySQL dump 10.16  Distrib 10.1.26-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: db
-- ------------------------------------------------------
-- Server version	10.1.26-MariaDB-0+deb9u1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table WhoAmI.tblAuthor
--
CREATE Database IF NOT EXISTS WhoAmI;
DROP TABLE IF EXISTS WhoAmI.tblAuthor;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE WhoAmI.tblAuthor (
  `AuthorId` tinyint(4) DEFAULT NULL,
  `AuthorName` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table WhoAmI.tblAuthor
--

LOCK TABLES WhoAmI.tblAuthor WRITE;
/*!40000 ALTER TABLE WhoAmI.tblAuthor DISABLE KEYS */;
INSERT INTO WhoAmI.tblAuthor VALUES (1,'Chris Chibnall'),(2,'Gareth Roberts'),(3,'Helen Raynor'),(4,'James Moran'),(5,'James Strong'),(6,'Jamie Matheson'),(7,'Keith Temple'),(8,'Mark Gatiss'),(9,'Matt Jones'),(10,'Matthew Graham'),(11,'Neil Cross'),(12,'Neil Gaiman'),(13,'Paul Cornell'),(14,'Peter Harness'),(15,'Phil Ford'),(16,'Richard Curtis'),(17,'Robert Shearman'),(18,'Russell T. Davies'),(19,'Simon Nye'),(20,'Stephen Greenhorn'),(21,'Steve Thompson'),(22,'Steven Moffat'),(23,'Toby Whithouse'),(24,'Tom MacRae'),(25,'Frank Cottrell Boyce');
/*!40000 ALTER TABLE WhoAmI.tblAuthor ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table WhoAmI.tblCompanion
--

DROP TABLE IF EXISTS WhoAmI.tblCompanion;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE WhoAmI.tblCompanion (
  `CompanionId` tinyint(4) DEFAULT NULL,
  `CompanionName` varchar(23) DEFAULT NULL,
  `WhoPlayed` varchar(16) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table WhoAmI.tblCompanion
--

LOCK TABLES WhoAmI.tblCompanion WRITE;
/*!40000 ALTER TABLE WhoAmI.tblCompanion DISABLE KEYS */;
INSERT INTO WhoAmI.tblCompanion VALUES (1,'River Song','Alex Kingston'),(2,'Rory Williams','Arthur Darvill'),(3,'Wilfred Mott','Bernard Cribbins'),(4,'Rose Tyler','Billie Piper'),(5,'Adam Mitchell','Bruno Langley'),(6,'Donna Noble','Catherine Tate'),(7,'Jackson Lake','David Morrissey'),(8,'Sarah Jane Smith','Elisabeth Sladen'),(9,'Martha Jones','Freema Agyeman'),(10,'Craig Owens','James Corden'),(11,'Clara Oswald','Jenna Coleman'),(12,'Jack Harkness','John Barrowman'),(13,'Amy Pond','Karen Gillan'),(14,'Astrid Peth','Kylie Minogue'),(15,'Adelaide Brooke','Lindsay Duncan'),(16,'Lady Christina de Souza','Michelle Ryan'),(17,'Mickey Smith','Noel Clarke'),(18,'Rosita Farisi','Velle Tshabalala');
/*!40000 ALTER TABLE WhoAmI.tblCompanion ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table WhoAmI.tblDoctor
--

DROP TABLE IF EXISTS WhoAmI.tblDoctor;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE WhoAmI.tblDoctor (
  `DoctorId` tinyint(4) DEFAULT NULL,
  `DoctorNumber` tinyint(4) DEFAULT NULL,
  `DoctorName` varchar(21) DEFAULT NULL,
  `BirthDate` varchar(10) DEFAULT NULL,
  `FirstEpisodeDate` varchar(10) DEFAULT NULL,
  `LastEpisodeDate` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table WhoAmI.tblDoctor
--

LOCK TABLES WhoAmI.tblDoctor WRITE;
/*!40000 ALTER TABLE WhoAmI.tblDoctor DISABLE KEYS */;
INSERT INTO WhoAmI.tblDoctor VALUES (1,9,'Christopher Eccleston','1964-02-16','2005-03-26','2005-06-18'),(2,6,'Colin Baker','1943-06-08','1984-03-16','1986-12-06'),(3,10,'David Tennant','1971-04-18','2005-06-18','2010-01-01'),(4,3,'Jon Pertwee','2019-07-07','1970-01-03','1974-06-08'),(5,11,'Matt Smith','1982-10-28','2010-01-01','2013-12-25'),(6,2,'Patrick Troughton','1920-03-25','1966-10-29','1969-06-21'),(7,8,'Paul McGann','1959-11-14','1996-05-27','1996-05-27'),(8,12,'Peter Capaldi','1958-04-14','2013-12-25',''),(9,5,'Peter Davison','1951-04-13','1981-03-21','1984-03-16'),(10,7,'Sylvester McCoy','1943-08-20','1987-09-07','1989-12-06'),(11,4,'Tom Baker','1934-01-20','1974-06-08','1981-03-21'),(12,1,'William Hartnell','2008-01-08','1963-11-23','1966-10-29');
/*!40000 ALTER TABLE WhoAmI.tblDoctor ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table WhoAmI.tblEnemy
--

DROP TABLE IF EXISTS WhoAmI.tblEnemy;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE WhoAmI.tblEnemy (
  `EnemyId` tinyint(4) DEFAULT NULL,
  `EnemyName` varchar(26) DEFAULT NULL,
  `Description` varchar(85) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table WhoAmI.tblEnemy
--

LOCK TABLES WhoAmI.tblEnemy WRITE;
/*!40000 ALTER TABLE WhoAmI.tblEnemy DISABLE KEYS */;
INSERT INTO WhoAmI.tblEnemy VALUES (1,'The Autons','Murderous mannequins'),(2,'Lady Cassandra','The last living human being'),(3,'The Gelth','An alien species comprised of gas'),(4,'The Slitheen','A baby-faced alien family'),(5,'Daleks','Armoured aliens'),(6,'Jagrafess','A hideous, giant slug-like creature'),(7,'Reapers','Winged reptile-like creatures'),(8,'The empty child','A by-product of a dead four-year-old child'),(9,'The Sycorax','An alien race wearing bone-like masks'),(10,'Face of Boe','A gigantic humanoid head'),(11,'Sisters of Plenitude','A humanoid feline race, also known as \"Catkind\"'),(12,'Werewolf','A werewolf moster'),(13,'Krillitanes','Carnivorous, winged bat-like creatures'),(14,'Clockwork Droids','Repair droids wearing scary masks'),(15,'Cybermen','Cyborg race'),(16,'The Wire','An alien lifeform of pure energy, taking human female form'),(17,'The Ood','Aliens with tentacled faces carrying translation spheres'),(18,'The Beast','Gigantic monster claiming to be Satan'),(19,'The Abzorbaloff','Obese alien which absorbs victims through touch'),(20,'Isolus','Alien resembling a small white flower, which will do anything not to be alone'),(21,'Roboforms','Robots disguised as Santas'),(22,'The empress of the Racnoss','The empress of a half-human, half arachnid race called the Racnoss'),(23,'The Judoon','Galactic stormtroopers resembling rhinoceroses'),(24,'Plasmavores','Blood-sucking aliens disguised as humans'),(25,'The Carrionites','Witch-like beings'),(26,'The Macra','Giant crab-like creatures living under a motorway'),(27,'Lazarus','Large creature needing to absorb human energy'),(28,'Scarecrows','Scarecrows brought to life by the Family of Blood'),(29,'Weeping angels','Stone angels which kill when you stop looking at them'),(30,'Futurekind','Humanoid race with large pointed teeth from the distant future'),(31,'The Toclafane','Cyborgs from the distant future integrated into metallic spheres'),(32,'The Master','A renegade Time Lord, the arch-enemy of Dr. Who'),(33,'The Host','Golden robotic angels controlled by Max Capricorn'),(34,'Max Capricorn','A cyborg head in a box'),(35,'Adipose','Small creatures created from excess human fat'),(36,'Pyroviles','Creatures constructed from volcanic magma'),(37,'The Sontaran','Milatristic aliens with squat features and strange ears'),(38,'The Hath','Fish-faced aliens'),(39,'The Vespiform','Wasp-like aliens'),(40,'Vashta Nerada','Microscopic carnivorous aliens'),(41,'The Time Beetle','Beetle feeding off time energy which alters time'),(42,'Davros','Creator of the Daleks'),(43,'Prisoner Zero','A snake-like shape-shifting alien'),(44,'The Atraxi','Giant eyeballs which act as a galactic police force'),(45,'Smilers','Androids indicating danger according to which way they face'),(46,'Saturnynian','Sea-dwelling aliens which change the perception of people looking at them'),(47,'Eknodine','Aliens hiding inside humans which attack by making them emit a green stalk'),(48,'Silurians','Lizard like creatures with green scaly skins'),(49,'Krafayis','Invisible bird-like creature'),(50,'Sky shark','A flying shark'),(51,'The Silence','Aliens who make you forget they existed the moment you stop looking at them'),(52,'The Siren','A virtual doctor disguised as a beautiful female'),(53,'House','A green entity which feeds on TARDIS'),(54,'Gangers','Clones created from living flesh, which can be manipulated into any creature'),(55,'Headless Monks','Headless monks armed with energy blades'),(56,'The Teselecta','A shape-shifting robot that travels in time to right past wrongs'),(57,'Peg Dolls','Peg dolls which can transfom humans into one of their own'),(58,'Handbots','Medical robots whose heads contain a concealed weapon'),(59,'The Minotaur','A monster which feeds off the faith of victims'),(60,'Solomon','A humanoid controlling the Silurians'),(61,'Kahler-Tek','A Cyborg soldier, also known as \"The Gunslinger\"'),(62,'Kahler-Jex','An alien doctor with a unique facial marking'),(63,'The Shakri','Bald, decrepit-looking humanoids with a thing for cubes and the number seven'),(64,'The Great Intelligence','Disembodied being trying to find a body, whose proper name is Yog-Sothoth'),(65,'The Snowmen','Snowmen with psychic properties who attack people'),(66,'Akhaten','A parasitic, sentient planet feeding on the souls of its inhabitants'),(67,'Skaldak','An ice warrior'),(68,'Time Zombies','Distorted future versions of the Doctor and associates'),(69,'Mister Sweet','Also known as the crismon horror, a species of red leech'),(70,'Winifred Gillyflower','A chemist who created Mister Sweet'),(71,'Mr. Clever','An entity which tries to overtake the Doctor\'s mind'),(72,'Zygons','Reddish humanoids with cone-shaped heads, covered in suckers'),(73,'The Sheriff of Nottingham','A cyborg posing as the real Sheriff'),(74,'Ms Delphox','A clone heading a bank'),(75,'Skovox Blitzer','A robot built for war'),(76,'Foretold','An ancient soldier kept alive by technology'),(77,'Gus','A computer trying to take control of the Foretold'),(78,'Boneless','Two-dimensional shape-shifting creatures which can reduce others to 2D'),(79,'Dream crabs','Predators resembling human hands which work by telepathy, properly called Kantrofarri');
/*!40000 ALTER TABLE WhoAmI.tblEnemy ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table WhoAmI.tblEpisode
--

DROP TABLE IF EXISTS WhoAmI.tblEpisode;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE WhoAmI.tblEpisode (
  `EpisodeId` smallint(6) DEFAULT NULL,
  `SeriesNumber` tinyint(4) DEFAULT NULL,
  `EpisodeNumber` varchar(2) DEFAULT NULL,
  `EpisodeType` varchar(23) DEFAULT NULL,
  `Title` varchar(38) DEFAULT NULL,
  `EpisodeDate` varchar(10) DEFAULT NULL,
  `AuthorId` tinyint(4) DEFAULT NULL,
  `DoctorId` tinyint(4) DEFAULT NULL,
  `Notes` varchar(99) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table WhoAmI.tblEpisode
--

LOCK TABLES WhoAmI.tblEpisode WRITE;
/*!40000 ALTER TABLE WhoAmI.tblEpisode DISABLE KEYS */;
INSERT INTO WhoAmI.tblEpisode VALUES (1,1,'1','Normal episode','Rose','2005-03-26',18,1,''),(2,1,'2','Normal episode','The End of the World','2005-04-02',18,1,''),(3,1,'3','Normal episode','The Unquiet Dead','2005-04-09',18,1,''),(4,1,'4','Normal episode','Aliens of London (Part 1)','2005-04-16',18,1,''),(5,1,'5','Normal episode','World War Three (Part 2)','2005-04-23',18,1,''),(6,1,'6','Normal episode','Dalek','2005-04-30',17,1,''),(7,1,'7','Normal episode','The Long Game','2005-05-07',18,1,''),(8,1,'8','Normal episode','Father\'s Day','2005-05-14',13,1,''),(9,1,'9','Normal episode','The Empty Child (Part 1)','2005-05-21',22,1,''),(10,1,'10','Normal episode','The Doctor Dances (Part 2)','2005-05-28',22,1,''),(11,1,'11','Normal episode','Boom Town','2005-06-04',18,1,''),(12,1,'12','Normal episode','Bad Wolf (Part 1)','2005-06-11',18,1,''),(13,1,'13','Normal episode','The Parting of the Ways (Part 2)','2005-06-18',18,1,''),(14,2,'','Christmas special','The Christmas Invasion','2005-12-25',18,3,''),(15,2,'1','Normal episode','New Earth','2006-04-15',18,3,''),(16,2,'2','Normal episode','Tooth and Claw','2006-04-22',18,3,''),(17,2,'3','Normal episode','School Reunion','2006-04-29',23,3,''),(18,2,'4','Normal episode','The Girl in the Fireplace','2006-05-06',22,3,''),(19,2,'5','Normal episode','Rise of the Cybermen (Part 1)','2006-05-13',24,3,''),(20,2,'6','Normal episode','The Age of Steel (Part 2)','2006-05-20',24,3,''),(21,2,'7','Normal episode','The Idiot\'s Lantern','2006-05-27',8,3,''),(22,2,'8','Normal episode','The Impossible Planet (Part 1)','2006-06-03',9,3,''),(23,2,'9','Normal episode','The Satan Pit (Part 2)','2006-06-10',9,3,''),(24,2,'10','Normal episode','Love & Monsters','2006-06-17',18,3,''),(25,2,'11','Normal episode','Fear Her','2006-06-24',10,3,''),(26,2,'12','Normal episode','Army of Ghosts (Part 1)','2006-07-01',18,3,''),(27,2,'13','Normal episode','Doomsday (Part 2)','2006-07-08',18,3,''),(28,3,'','Christmas special','The Runaway Bride','2006-12-25',18,3,''),(29,3,'1','Normal episode','Smith and Jones','2007-03-31',18,3,''),(30,3,'2','Normal episode','The Shakespeare Code','2007-04-07',2,3,''),(31,3,'3','Normal episode','Gridlock','2007-04-14',18,3,'Guest appearance by Ardal O\'Hanlon \r\n'),(32,3,'4','Normal episode','Daleks in Manhattan (Part 1)','2007-04-21',5,3,'Technically monster is a human-dalek hybrid\r\n'),(33,3,'5','Normal episode','Evolution of the Daleks (Part 2)','2007-04-28',5,3,''),(34,3,'6','Normal episode','The Lazarus Experiment','2007-05-05',20,3,''),(35,3,'7','Normal episode','42','2007-05-19',1,3,''),(36,3,'8','Normal episode','Human Nature (Part 1)','2007-05-26',13,3,''),(37,3,'9','Normal episode','The Family of Blood (Part 2)','2007-06-02',13,3,''),(38,3,'10','Normal episode','Blink','2007-06-09',22,3,''),(39,3,'11','Normal episode','Utopia (Part 1)','2007-06-16',18,3,'Guest appearance by Derek Jacobi\r\n'),(40,3,'12','Normal episode','The Sound of Drums (Part 2)','2007-06-23',18,3,''),(41,3,'13','Normal episode','Last of the Time Lords (Part 3)','2007-06-30',18,3,''),(42,4,'','Christmas special','Voyage of the Damned','2007-12-25',18,3,''),(43,4,'1','Normal episode','Partners in Crime','2008-04-05',18,3,''),(44,4,'2','Normal episode','The Fires of Pompeii','2008-04-12',4,3,'Both Peter Capaldi and Karen Gillan play characters in this episode (future Doctor and companion)\r\n'),(45,4,'3','Normal episode','Planet of the Ood','2008-04-19',7,3,''),(46,4,'4','Normal episode','The Sontaran Stratagem (Part 1)','2008-04-26',3,3,''),(47,4,'5','Normal episode','The Poison Sky (Part 2)','2008-05-03',3,3,''),(48,4,'6','Normal episode','The Doctor\'s Daughter','2008-05-10',20,3,''),(49,4,'7','Normal episode','The Unicorn and the Wasp','2008-05-17',2,3,'Felicity Kendal guest stars\r\n'),(50,4,'8','Normal episode','Silence in the Library (Part 1)','2008-05-31',22,3,'Count the shadows …\r\n'),(51,4,'9','Normal episode','Forest of the Dead (Part 2)','2008-06-07',22,3,''),(52,4,'10','Normal episode','Midnight','2008-06-14',18,3,''),(53,4,'11','Normal episode','Turn Left','2008-06-21',18,3,''),(54,4,'12','Normal episode','The Stolen Earth (Part 1)','2008-06-28',18,3,''),(55,4,'13','Normal episode','Journey\'s End (Part 2)','2008-07-05',18,3,''),(56,4,'','Christmas special','The Next Doctor','2008-12-25',18,3,''),(57,4,'','Easter special','Planet of the Dead','2009-04-11',2,3,''),(58,4,'','Autumn special','The Waters of Mars','2009-11-15',15,3,''),(59,4,'','Christmas special','The End of Time (Part 1)','2009-12-25',18,3,''),(60,4,'','Christmas special','The End of Time (Part 2)','2010-01-01',18,3,''),(61,5,'1','Normal episode','The Eleventh Hour','2010-04-03',22,5,''),(62,5,'2','Normal episode','The Beast Below','2010-04-10',22,5,''),(63,5,'3','Normal episode','Victory of the Daleks','2010-04-17',8,5,''),(64,5,'4','Normal episode','The Time of Angels (Part 1)','2010-04-24',22,5,''),(65,5,'5','Normal episode','Flesh and Stone (Part 2)','2010-05-01',22,5,''),(66,5,'6','Normal episode','The Vampires of Venice','2010-05-08',23,5,''),(67,5,'7','Normal episode','Amy\'s Choice','2010-05-15',19,5,''),(68,5,'8','Normal episode','The Hungry Earth (Part 1)','2010-05-22',1,5,''),(69,5,'9','Normal episode','Cold Blood (Part 2)','2010-05-29',1,5,''),(70,5,'10','Normal episode','Vincent and the Doctor','2010-06-05',16,5,''),(71,5,'11','Normal episode','The Lodger','2010-06-12',2,5,''),(72,5,'12','Normal episode','The Pandorica Opens (Part 1)','2010-06-19',22,5,''),(73,5,'13','Normal episode','The Big Bang (Part 2)','2010-06-26',22,5,''),(74,6,'','Christmas special','A Christmas Carol','2010-12-25',22,5,'Michael Gambon guest stars\r\n'),(75,6,'1','Normal episode','The Impossible Astronaut (Part 1)','2011-04-23',22,5,''),(76,6,'2','Normal episode','Day of the Moon (Part 2)','2011-04-30',22,5,''),(77,6,'3','Normal episode','The Curse of the Black Spot','2011-05-07',21,5,''),(78,6,'4','Normal episode','The Doctor\'s Wife','2011-05-14',12,5,''),(79,6,'5','Normal episode','The Rebel Flesh (Part 1)','2011-05-21',10,5,''),(80,6,'6','Normal episode','The Almost People (Part 2)','2011-05-28',10,5,''),(81,6,'7','Normal episode','A Good Man Goes to War','2011-06-04',22,5,''),(82,6,'8','Normal episode','Let\'s Kill Hitler','2011-08-27',22,5,''),(83,6,'9','Normal episode','Night Terrors','2011-09-03',8,5,''),(84,6,'10','Normal episode','The Girl Who Waited','2011-09-10',24,5,''),(85,6,'11','Normal episode','The God Complex','2011-09-17',23,5,''),(86,6,'12','Normal episode','Closing Time','2011-09-24',2,5,''),(87,6,'13','Normal episode','The Wedding of River Song','2011-10-01',22,5,''),(88,7,'','Christmas special','The Doctor, the Widow and the Wardrobe','2011-12-25',22,5,''),(89,7,'1','Normal episode','Asylum of the Daleks','2012-09-01',22,5,''),(90,7,'2','Normal episode','Dinosaurs on a Spaceship','2012-09-08',1,5,''),(91,7,'3','Normal episode','A Town Called Mercy','2012-09-15',23,5,''),(92,7,'4','Normal episode','The Power of Three','2012-09-22',1,5,''),(93,7,'5','Normal episode','The Angels Take Manhattan','2012-09-29',22,5,''),(94,7,'','Christmas special','The Snowmen','2012-12-25',22,5,''),(95,7,'6','Normal episode','The Bells of Saint John','2013-03-30',22,5,''),(96,7,'7','Normal episode','The Rings of Akhaten','2013-04-06',11,5,''),(97,7,'8','Normal episode','Cold War','2013-04-13',8,5,''),(98,7,'9','Normal episode','Hide','2013-04-20',11,5,''),(99,7,'10','Normal episode','Journey to the Centre of the TARDIS','2013-04-27',21,5,''),(100,7,'11','Normal episode','The Crimson Horror','2013-05-04',8,5,'Diana Rigg plays the main baddie in this episode\r\n'),(101,7,'12','Normal episode','Nightmare in Silver','2013-05-11',12,5,''),(102,7,'13','Normal episode','The Name of the Doctor','2013-05-18',22,5,'Features cameo appearances from all of the previous doctors\r\n'),(103,8,'','50th anniversary specia','The Day of the Doctor','2013-11-23',22,5,''),(104,8,'','Christmas special','The Time of the Doctor','2013-12-25',22,5,''),(105,8,'1','Normal episode','Deep Breath','2014-08-23',22,8,''),(106,8,'2','Normal episode','Into the Dalek','2014-08-30',22,8,''),(107,8,'3','Normal episode','Robot of Sherwood','2014-09-06',8,8,''),(108,8,'4','Normal episode','Listen','2014-09-13',22,8,''),(109,8,'5','Normal episode','Time Heist','2014-09-20',21,8,''),(110,8,'6','Normal episode','The Caretaker','2014-09-27',2,8,''),(111,8,'7','Normal episode','Kill the Moon','2014-10-04',14,8,''),(112,8,'8','Normal episode','Mummy on the Orient Express','2014-10-11',6,8,'John Sessions was the voice actor for this episode\r\n'),(113,8,'9','Normal episode','Flatline','2014-10-18',6,8,''),(114,8,'10','Normal episode','In the Forest of the Night','2014-10-25',25,8,''),(115,8,'11','Normal episode','Dark Water (Part 1)','2014-11-01',22,8,''),(116,8,'12','Normal episode','Death in Heaven (Part 2)','2014-11-08',22,8,''),(117,9,'','Christmas special','Last Christmas','2014-12-25',22,8,'');
/*!40000 ALTER TABLE WhoAmI.tblEpisode ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table WhoAmI.tblEpisodeCompanion
--

DROP TABLE IF EXISTS WhoAmI.tblEpisodeCompanion;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE WhoAmI.tblEpisodeCompanion (
  `EpisodeCompanionId` smallint(6) DEFAULT NULL,
  `EpisodeId` smallint(6) DEFAULT NULL,
  `CompanionId` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table WhoAmI.tblEpisodeCompanion
--

LOCK TABLES WhoAmI.tblEpisodeCompanion WRITE;
/*!40000 ALTER TABLE WhoAmI.tblEpisodeCompanion DISABLE KEYS */;
INSERT INTO WhoAmI.tblEpisodeCompanion VALUES (1,1,4),(2,2,4),(3,3,4),(4,4,4),(5,5,4),(6,6,4),(7,7,4),(8,8,4),(9,9,4),(10,10,4),(11,11,4),(12,12,4),(13,13,4),(14,14,4),(15,15,4),(16,16,4),(17,17,4),(18,18,4),(19,19,4),(20,20,4),(21,21,4),(22,22,4),(23,23,4),(24,24,4),(25,25,4),(26,26,4),(27,27,4),(28,28,6),(29,29,9),(30,30,9),(31,31,9),(32,32,9),(33,33,9),(34,34,9),(35,35,9),(36,36,9),(37,37,9),(38,38,9),(39,39,9),(40,40,9),(41,41,9),(42,42,14),(43,43,6),(44,44,6),(45,45,6),(46,46,6),(47,47,6),(48,48,6),(49,49,6),(50,50,6),(51,51,6),(52,52,6),(53,53,6),(54,54,6),(55,55,6),(56,56,7),(57,57,16),(58,58,15),(59,59,3),(60,60,3),(61,61,13),(62,62,13),(63,63,13),(64,64,13),(65,65,13),(66,66,13),(67,67,13),(68,68,13),(69,69,13),(70,70,13),(71,71,13),(72,72,13),(73,73,13),(74,74,13),(75,75,13),(76,76,13),(77,77,13),(78,78,13),(79,79,13),(80,80,13),(81,81,13),(82,82,13),(83,83,13),(84,84,13),(85,85,13),(86,86,13),(87,87,13),(88,88,13),(89,89,13),(90,90,13),(91,91,13),(92,92,13),(93,93,13),(94,94,11),(95,95,11),(96,96,11),(97,97,11),(98,98,11),(99,99,11),(100,100,11),(101,101,11),(102,102,11),(103,103,11),(104,104,11),(105,105,11),(106,106,11),(107,107,11),(108,108,11),(109,109,11),(110,110,11),(111,111,11),(112,112,11),(113,113,11),(114,114,11),(115,115,11),(116,116,11),(117,117,11),(118,6,5),(119,7,5),(120,9,12),(121,10,12),(122,11,12),(123,12,12),(124,13,12),(125,17,17),(126,18,17),(127,19,17),(128,20,17),(129,39,12),(130,40,12),(131,41,12),(132,43,4),(133,46,9),(134,47,9),(135,48,9),(136,50,1),(137,51,1),(138,52,4),(139,53,4),(140,54,4),(141,55,4),(142,56,18),(143,61,2),(144,64,1),(145,65,1),(146,66,2),(147,67,2),(148,68,2),(149,69,2),(150,71,10),(151,72,1),(152,73,1),(153,74,2),(154,75,2),(155,76,2),(156,77,2),(157,78,2),(158,79,2),(159,80,2),(160,81,2),(161,82,2),(162,83,2),(163,84,2),(164,85,2),(165,86,2),(166,87,2),(167,88,2),(168,89,2),(169,90,2),(170,91,2),(171,92,2),(172,93,2),(173,102,1);
/*!40000 ALTER TABLE WhoAmI.tblEpisodeCompanion ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table WhoAmI.tblEpisodeEnemy
--

DROP TABLE IF EXISTS WhoAmI.tblEpisodeEnemy;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE WhoAmI.tblEpisodeEnemy (
  `EpisodeEnemyId` smallint(6) DEFAULT NULL,
  `EpisodeId` smallint(6) DEFAULT NULL,
  `EnemyId` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table WhoAmI.tblEpisodeEnemy
--

LOCK TABLES WhoAmI.tblEpisodeEnemy WRITE;
/*!40000 ALTER TABLE WhoAmI.tblEpisodeEnemy DISABLE KEYS */;
INSERT INTO WhoAmI.tblEpisodeEnemy VALUES (1,15,10),(2,26,15),(3,27,15),(4,72,15),(5,73,15),(6,116,15),(7,54,42),(8,55,42),(9,31,10),(10,112,77),(11,91,62),(12,101,71),(13,29,24),(14,61,44),(15,22,18),(16,23,18),(17,28,22),(18,42,33),(19,40,32),(20,41,32),(21,59,17),(22,86,51),(23,104,51),(24,87,51),(25,75,56),(26,103,72),(27,15,11),(28,15,2),(29,26,5),(30,27,5),(31,72,5),(32,73,5),(33,116,32),(34,54,5),(35,55,5),(36,31,26),(37,112,76),(38,91,61),(39,101,15),(40,29,23),(41,61,43),(42,22,17),(43,23,17),(44,28,21),(45,42,34),(46,40,31),(47,41,31),(48,59,32),(49,86,15),(50,104,5),(51,87,56),(52,75,51),(53,103,5),(54,43,35),(55,96,66),(56,113,78),(57,18,14),(58,105,14),(59,19,15),(60,20,15),(61,56,15),(62,6,5),(63,12,5),(64,13,5),(65,32,5),(66,33,5),(67,63,5),(68,89,5),(69,106,5),(70,67,47),(71,39,30),(72,79,54),(73,80,54),(74,84,58),(75,81,55),(76,78,53),(77,25,20),(78,7,6),(79,117,79),(80,70,49),(81,17,13),(82,2,2),(83,34,27),(84,109,74),(85,83,57),(86,44,36),(87,8,7),(88,66,46),(89,36,28),(90,37,28),(91,68,48),(92,69,48),(93,97,67),(94,110,75),(95,74,50),(96,62,45),(97,90,60),(98,24,19),(99,1,1),(100,30,25),(101,9,8),(102,10,8),(103,3,3),(104,95,64),(105,102,64),(106,48,38),(107,60,32),(108,115,32),(109,85,59),(110,45,17),(111,92,63),(112,107,73),(113,76,51),(114,77,52),(115,4,4),(116,5,4),(117,11,4),(118,94,65),(119,46,37),(120,47,37),(121,14,9),(122,82,56),(123,53,41),(124,21,16),(125,99,68),(126,50,40),(127,51,40),(128,38,29),(129,64,29),(130,65,29),(131,93,29),(132,16,12);
/*!40000 ALTER TABLE WhoAmI.tblEpisodeEnemy ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-08-22 15:20:26
