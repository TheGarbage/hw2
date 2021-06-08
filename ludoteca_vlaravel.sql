-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Giu 06, 2021 alle 20:28
-- Versione del server: 10.4.14-MariaDB
-- Versione PHP: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ludoteca_vlaravel`
--

DELIMITER $$
--
-- Procedure
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `gioca` (IN `game_id` INT, IN `emplacement_id` INT, IN `card_id` INT)  Begin
Declare orario datetime;
Set orario=current_timestamp();
Insert into current_uses (`game_id`, `emplacement_id`, `card_id`, `inizio`) values (game_id, emplacement_id, card_id, orario);
Delete from current_uses where current_uses.emplacement_id=emplacement_id and inizio<>orario;
Delete from current_uses where current_uses.card_id=card_id and inizio<>orario;
End$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ingresso` (IN `user_id` INT, IN `card_id` INT)  Begin
update cards set inizio=(current_timestamp()), user_id=(user_id) where id=card_id;
End$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `inizia_evento` (IN `event_id` INT, IN `game_id` INT, IN `durata_minuti` INT)  Begin 
Insert into events values (default, current_timestamp(), event_id, game_id, default, durata_minuti, default, default);
End$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `proc1` (IN `categoria` VARCHAR(20))  Begin
Case categoria
When 'fps' then
Select a.Game_id, Titolo, Genere, sum(n_avvi) as N_avvi, count(*) as Utenti from vista2 a join fps_games b on (a.game_id=b.game_id) 
group by game_id, titolo, genere order by utenti desc;
Select Game_id, v.Titolo, c.Genere, 'Si' as Non_usato from games v join fps_games c on v.id=c.game_id where v.id not in(select game_id from vista2);
Select sum(t.Utenti) as N_utenti_Fps from (Select a.game_id, count(*) as Utenti from vista2 a join fps_games b on (a.game_id=b.game_id) group by game_id) t;
When 'arcade' then
Select a.Game_id, Titolo, sum(n_avvi) as N_avvi, count(*) as Utenti from vista2 a join arcade_games b on (a.game_id=b.game_id) 
group by game_id, titolo order by utenti desc;
Select Game_id, v.Titolo, 'Si' as Non_usato from games v join arcade_games c on v.id=c.game_id where v.id not in(select game_id from vista2);
Select sum(t.Utenti) as N_utenti_Arcade from (Select a.game_id, count(*) as Utenti from vista2 a join arcade_games b on (a.game_id=b.game_id) group by game_id) t;
When 'quiz' then
Select a.Game_id, Titolo, Argomento, sum(n_avvi) as N_avvi, count(*) as Utenti from vista2 a join quiz_games b on (a.game_id=b.game_id) 
group by game_id, titolo, Argomento order by utenti desc;
Select Game_id, v.Titolo, c.Argomento, 'Si' as Non_usato from games v join quiz_games c on v.id=c.game_id where v.id not in(select game_id from vista2);
Select sum(t.Utenti) as N_utenti_Quiz from (Select a.game_id, count(*) as Utenti from vista2 a join quiz_games b on (a.game_id=b.game_id) group by game_id) t;
When 'corsa' then
Select a.Game_id, Titolo, Tipo_gara, sum(n_avvi) as N_avvi, count(*) as Utenti from vista2 a join racing_games b on (a.game_id=b.game_id) 
group by game_id, titolo, Tipo_gara order by utenti desc;
Select Game_id, v.Titolo, c.Tipo_gara, 'Si' as Non_usato from games v join racing_games c on v.id=c.game_id where v.id not in(select game_id from vista2);
Select sum(t.Utenti) as N_utenti_Quiz from (Select a.game_id, count(*) as Utenti from vista2 a join racing_games b on (a.game_id=b.game_id) group by game_id) t;
When 'tutti_compatto' then
Select * from (Select 'Fps' as categoria, sum(t.Utenti) as N_utenti from (Select a.Game_id, count(*) as Utenti from vista2 a join fps_games b on (a.game_id=b.game_id) group by Game_id) t) a
Union (Select 'Arcade' as categoria, sum(t.Utenti) as N_utenti from (Select a.Game_id, count(*) as Utenti from vista2 a join arcade_games b on (a.game_id=b.game_id) group by Game_id) t)
Union (Select 'Quiz' as categoria, sum(t.Utenti) as N_utenti from (Select a.Game_id, count(*) as Utenti from vista2 a join quiz_games b on (a.game_id=b.game_id) group by Game_id) t)
Union (Select 'Corsa' as categoria, sum(t.Utenti) as N_utenti from (Select a.Game_id, count(*) as Utenti from vista2 a join racing_games b on (a.game_id=b.game_id) group by Game_id) t)
Order by N_utenti desc;
When 'tutti' then
Select game_id, Titolo, sum(n_avvi) as N_avvi, count(*) as Utenti from vista2
group by game_id, titolo order by utenti desc;
Select id as game_id, Titolo, 'Si' as Non_usato from games where id not in(select game_id from vista2);
Else select 'Inserire uno fra fps, arcade, quiz, tutti, tutti_compatto' as Errore;
End case;
End$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `proc2` (IN `numero` INT)  Begin
Declare tot int;
select count(*) into tot from vista1; 
Drop temporary table if exists temp;
Create temporary table temp(posizione int, user_id int, username varchar(20), punti_totali int, occupazione varchar(30), anno_nascita date, media_punteggio decimal(7,2),  
media_sconto decimal(5,2), media_spesa decimal(5,2), totale_spesa decimal(10,2), N_fps int, N_arcade int, N_corsa int, N_quiz int);
Insert into temp
Select (tot-(select count(*) from vista1 v2 where v1.punti_totali > v2.punti_totali and v1.user_id<>v2.user_id)) as posizione, v1.user_id, v1.username, v1.punti_totali,  v1.occupazione, v1.anno_nascita, v1.media_punteggio, v1.media_sconto, v1.media_spesa, v1.totale_spesa, v1.N_fps, v1.N_arcade, v1.N_corsa, v1.N_quiz
From vista1 v1
Order by posizione;
Select posizione, username, year(anno_nascita) as anno_nascita, media_punteggio, media_sconto, username, punti_totali from temp where posizione<=numero;
End$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `proc3` (IN `card_id` INT, IN `punteggio` INT)  Begin 
Declare time_inizio datetime;
Declare utente int;
Select inizio into time_inizio from cards where id=card_id;
Select user_id into utente from cards where id=card_id;
If not exists(select *from (select * from (select game_id, emplacement_id, card_id, inizio from current_uses) a union (select game_id, emplacement_id, card_id, inizio from past_uses)) o
   where o.card_id=card_id and inizio > time_inizio and inizio<current_timestamp) 
then insert into registers  (`user_id`, `card_id`, `inizio`, `fine`, `punteggio`, `sconto`, `spesa`)
values(utente, card_id, time_inizio, current_timestamp(), 0, 0, (hour(timediff(current_timestamp(),time_inizio))+1)*5);
Else Case
When punteggio <=50 then insert into registers  (`user_id`, `card_id`, `inizio`, `fine`, `punteggio`, `sconto`, `spesa`)
values(utente, card_id, time_inizio, current_timestamp(), punteggio, 0, (hour(timediff(current_timestamp(),time_inizio))+1)*5);
When punteggio>50 and punteggio<=100 then insert into registers  (`user_id`, `card_id`, `inizio`, `fine`, `punteggio`, `sconto`, `spesa`)
values(utente, card_id, time_inizio, current_timestamp(), punteggio, 11.5, (1-11.5/100)*(hour(timediff(current_timestamp(),time_inizio))+1)*5);
When punteggio>100 and punteggio<=150 then insert into registers  (`user_id`, `card_id`, `inizio`, `fine`, `punteggio`, `sconto`, `spesa`)
values(utente, card_id, time_inizio, current_timestamp(), punteggio, 22.5, (1-22.5/100)*(hour(timediff(current_timestamp(),time_inizio))+1)*5);
When punteggio>150 and punteggio <=300  then insert into registers  (`user_id`, `card_id`, `inizio`, `fine`, `punteggio`, `sconto`, `spesa`) 
values(utente, card_id, time_inizio, current_timestamp(), punteggio, 32.5, (1-32.5/100)*(hour(timediff(current_timestamp(),time_inizio))+1)*5);
When punteggio>300 and punteggio <=500  then insert into registers (`user_id`, `card_id`, `inizio`, `fine`, `punteggio`, `sconto`, `spesa`)
values(utente, card_id, time_inizio, current_timestamp(), punteggio, 42.5, (1-42.5/100)*(hour(timediff(current_timestamp(),time_inizio))+1)*5);
When punteggio>500 then insert into registers (`user_id`, `card_id`, `inizio`, `fine`, `punteggio`, `sconto`, `spesa`)
values(utente, card_id, time_inizio, current_timestamp(), punteggio, 52.5, (1-52.5/100)*(hour(timediff(current_timestamp(),time_inizio))+1)*5);
End case;
End if;
End$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `proc4` ()  Begin
Update events set concluso=1 where concluso=0 and  (inizio+interval durata_minuti minute) < current_timestamp();
Select  t.Nome, g.Titolo, g.id as codice, t.Modificatore_bonus, t.Modificatore_difficolta, 
Timediff((inizio+interval durata_minuti minute), current_timestamp()) as tempo_rimasto
from events e join event_types t on e.event_type_id=t.id join games g on e.game_id=g.id
where concluso=0 order by tempo_rimasto;
End$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Struttura della tabella `arcade_games`
--

CREATE TABLE `arcade_games` (
  `id` int(11) NOT NULL,
  `game_id` int(11) DEFAULT NULL,
  `record_punteggio` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `arcade_games`
--

INSERT INTO `arcade_games` (`id`, `game_id`, `record_punteggio`, `created_at`, `updated_at`) VALUES
(1, 11, 1000, '2021-05-31 16:36:57', '2021-05-31 16:36:57'),
(2, 12, 250, '2021-05-31 16:36:57', '2021-05-31 16:36:57'),
(3, 13, 0, '2021-05-31 16:36:57', '2021-05-31 16:36:57'),
(4, 14, 0, '2021-05-31 16:36:57', '2021-05-31 16:36:57'),
(5, 15, 90, '2021-05-31 16:36:57', '2021-05-31 16:36:57');

-- --------------------------------------------------------

--
-- Struttura della tabella `cards`
--

CREATE TABLE `cards` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `inizio` datetime NOT NULL DEFAULT current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `cards`
--

INSERT INTO `cards` (`id`, `user_id`, `inizio`, `created_at`, `updated_at`) VALUES
(1, NULL, '2021-06-01 18:12:53', '2021-05-31 15:10:55', '2021-05-31 15:10:55'),
(2, NULL, '2021-05-31 17:10:55', '2021-05-31 15:10:55', '2021-05-31 15:10:55'),
(3, NULL, '2021-05-31 17:10:55', '2021-05-31 15:10:55', '2021-05-31 15:10:55'),
(4, NULL, '2021-05-31 17:10:55', '2021-05-31 15:10:55', '2021-05-31 15:10:55'),
(5, NULL, '2021-05-31 17:10:55', '2021-05-31 15:10:55', '2021-05-31 15:10:55'),
(6, NULL, '2021-05-31 17:10:55', '2021-05-31 15:10:55', '2021-05-31 15:10:55');

-- --------------------------------------------------------

--
-- Struttura della tabella `contests`
--

CREATE TABLE `contests` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `nome_videogioco` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struttura stand-in per le viste `cronologia`
-- (Vedi sotto per la vista effettiva)
--
CREATE TABLE `cronologia` (
`id` int(11)
,`username` varchar(20)
,`card_id` int(11)
,`inizio` datetime
,`fine` datetime
,`punteggio` int(11)
,`sconto` decimal(5,2)
,`spesa` decimal(5,2)
);

-- --------------------------------------------------------

--
-- Struttura della tabella `current_uses`
--

CREATE TABLE `current_uses` (
  `id` int(11) NOT NULL,
  `game_id` int(11) DEFAULT NULL,
  `emplacement_id` int(11) DEFAULT NULL,
  `card_id` int(11) DEFAULT NULL,
  `inizio` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Trigger `current_uses`
--
DELIMITER $$
CREATE TRIGGER `trig1` BEFORE INSERT ON `current_uses` FOR EACH ROW Begin 
Declare settore int;
If exists(select * from cards where id=new.card_id and user_id is null)
Then signal SQLSTATE '45000' set message_text='scheda non associata a nessuno in questo momento';
End if;
Select hall_id into settore from emplacements where id=new.emplacement_id;
Case settore
When 1 then if not exists(select game_id from arcade_games where game_id=new.game_id)
Then signal SQLSTATE '45000' set message_text='puoi giocare solo arcade in questa postazione';
 end if;
When 2 then if not exists(select game_id from racing_games where game_id=new.game_id)
Then signal SQLSTATE '45000' set message_text='puoi giocare solo corsa in questa postazione';
 end if;
When 3 then if not exists(select game_id from fps_games where game_id=new.game_id)
Then signal SQLSTATE '45000' set message_text='puoi giocare solo fps in questa postazione';
 end if;
When 4 then if not exists(select game_id from quiz_games where game_id=new.game_id)
Then signal SQLSTATE '45000' set message_text='puoi giocare solo quiz in questa postazione';
 end if;
End case;
End
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `trig4` AFTER DELETE ON `current_uses` FOR EACH ROW Begin 
Insert into  past_uses  (`game_id`, `emplacement_id`, `card_id`,`inizio` )
Values (old.game_id, old.emplacement_id, old.card_id, old.inizio);
End
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Struttura della tabella `emplacements`
--

CREATE TABLE `emplacements` (
  `id` int(11) NOT NULL,
  `numero` int(11) DEFAULT NULL,
  `hall_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `emplacements`
--

INSERT INTO `emplacements` (`id`, `numero`, `hall_id`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '2021-05-31 16:22:01', '2021-05-31 16:22:01'),
(2, 2, 1, '2021-05-31 16:22:01', '2021-05-31 16:22:01'),
(3, 3, 1, '2021-05-31 16:22:01', '2021-05-31 16:22:01'),
(4, 4, 1, '2021-05-31 16:22:01', '2021-05-31 16:22:01'),
(5, 1, 2, '2021-05-31 16:22:01', '2021-05-31 16:22:01'),
(6, 2, 2, '2021-05-31 16:22:01', '2021-05-31 16:22:01'),
(7, 3, 2, '2021-05-31 16:22:01', '2021-05-31 16:22:01'),
(8, 4, 2, '2021-05-31 16:22:01', '2021-05-31 16:22:01'),
(9, 5, 2, '2021-05-31 16:22:01', '2021-05-31 16:22:01'),
(10, 6, 2, '2021-05-31 16:22:01', '2021-05-31 16:22:01'),
(11, 1, 4, '2021-05-31 16:22:01', '2021-05-31 16:22:01'),
(12, 2, 4, '2021-05-31 16:22:01', '2021-05-31 16:22:01'),
(13, 1, 3, '2021-05-31 16:22:01', '2021-05-31 16:22:01'),
(14, 2, 3, '2021-05-31 16:22:01', '2021-05-31 16:22:01'),
(15, 3, 3, '2021-05-31 16:22:01', '2021-05-31 16:22:01'),
(16, 4, 3, '2021-05-31 16:22:01', '2021-05-31 16:22:01');

-- --------------------------------------------------------

--
-- Struttura della tabella `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `inizio` datetime DEFAULT NULL,
  `event_type_id` int(11) DEFAULT NULL,
  `game_id` int(11) DEFAULT NULL,
  `concluso` tinyint(1) DEFAULT 0,
  `durata_minuti` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `events`
--

INSERT INTO `events` (`id`, `inizio`, `event_type_id`, `game_id`, `concluso`, `durata_minuti`, `created_at`, `updated_at`) VALUES
(1, '2021-06-01 12:58:46', 1, 10, 1, 5, '2021-06-01 10:58:46', '2021-06-01 10:58:46'),
(2, '2021-06-01 18:26:58', 1, 10, 1, 5, '2021-06-01 16:26:58', '2021-06-01 16:26:58');

-- --------------------------------------------------------

--
-- Struttura della tabella `event_types`
--

CREATE TABLE `event_types` (
  `id` int(11) NOT NULL,
  `nome` varchar(30) DEFAULT NULL,
  `modificatore_bonus` decimal(4,2) DEFAULT 1.00,
  `modificatore_difficolta` decimal(4,2) DEFAULT 1.00,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `event_types`
--

INSERT INTO `event_types` (`id`, `nome`, `modificatore_bonus`, `modificatore_difficolta`, `created_at`, `updated_at`) VALUES
(1, 'Bonus 1_5x', '1.50', '1.00', '2021-05-31 16:52:18', '2021-05-31 16:52:18'),
(2, 'Bonus 2x', '2.00', '1.00', '2021-05-31 16:52:18', '2021-05-31 16:52:18'),
(3, 'Brutale 1_5x', '3.00', '1.50', '2021-05-31 16:52:18', '2021-05-31 16:52:18'),
(4, 'Brutale 3x', '4.00', '3.00', '2021-05-31 16:52:18', '2021-05-31 16:52:18'),
(5, 'Brutale 5x', '10.00', '5.00', '2021-05-31 16:52:18', '2021-05-31 16:52:18');

-- --------------------------------------------------------

--
-- Struttura della tabella `fps_games`
--

CREATE TABLE `fps_games` (
  `id` int(11) NOT NULL,
  `game_id` int(11) DEFAULT NULL,
  `genere` varchar(30) DEFAULT NULL,
  `record_uccisioni_partita` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `fps_games`
--

INSERT INTO `fps_games` (`id`, `game_id`, `genere`, `record_uccisioni_partita`, `created_at`, `updated_at`) VALUES
(1, 1, 'Fantasy', 80, '2021-05-31 16:31:25', '2021-05-31 16:31:25'),
(2, 2, 'Fantascienza', 20, '2021-05-31 16:31:25', '2021-05-31 16:31:25'),
(3, 3, 'Simulazione', 60, '2021-05-31 16:31:25', '2021-05-31 16:31:25'),
(4, 4, 'Fantascienza', 0, '2021-05-31 16:31:25', '2021-05-31 16:31:25'),
(5, 5, 'Fantascienza', 101, '2021-05-31 16:31:25', '2021-05-31 16:31:25');

-- --------------------------------------------------------

--
-- Struttura della tabella `games`
--

CREATE TABLE `games` (
  `id` int(11) NOT NULL,
  `titolo` varchar(30) DEFAULT NULL,
  `pegi` int(11) DEFAULT 3,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `games`
--

INSERT INTO `games` (`id`, `titolo`, `pegi`, `created_at`, `updated_at`) VALUES
(1, 'Doom', 18, '2021-05-31 16:26:58', '2021-05-31 16:26:58'),
(2, 'Halo', 16, '2021-05-31 16:26:58', '2021-05-31 16:26:58'),
(3, 'Cod', 18, '2021-05-31 16:26:58', '2021-05-31 16:26:58'),
(4, 'Wolfenstein', 18, '2021-05-31 16:26:58', '2021-05-31 16:26:58'),
(5, 'Half life', 18, '2021-05-31 16:26:58', '2021-05-31 16:26:58'),
(6, 'Monza F1', 3, '2021-05-31 16:26:58', '2021-05-31 16:26:58'),
(7, 'Rally', 12, '2021-05-31 16:26:58', '2021-05-31 16:26:58'),
(8, 'Abu Dabhi F1', 3, '2021-05-31 16:26:58', '2021-05-31 16:26:58'),
(9, 'Qatar MotoGp', 7, '2021-05-31 16:26:58', '2021-05-31 16:26:58'),
(10, 'Nascar California', 3, '2021-05-31 16:26:58', '2021-05-31 16:26:58'),
(11, 'Pong', 3, '2021-05-31 16:26:58', '2021-05-31 16:26:58'),
(12, 'Space invaders', 3, '2021-05-31 16:26:58', '2021-05-31 16:26:58'),
(13, 'Pac-man', 3, '2021-05-31 16:26:58', '2021-05-31 16:26:58'),
(14, 'Tetris', 3, '2021-05-31 16:26:58', '2021-05-31 16:26:58'),
(15, 'Snake', 3, '2021-05-31 16:26:58', '2021-05-31 16:26:58'),
(16, 'Tabu', 12, '2021-05-31 16:26:58', '2021-05-31 16:26:58'),
(17, 'Moderno', 12, '2021-05-31 16:26:58', '2021-05-31 16:26:58'),
(18, 'Film', 12, '2021-05-31 16:26:58', '2021-05-31 16:26:58'),
(19, 'Sapere e Potere', 12, '2021-05-31 16:26:58', '2021-05-31 16:26:58'),
(20, 'Trivia', 12, '2021-05-31 16:26:58', '2021-05-31 16:26:58');

-- --------------------------------------------------------

--
-- Struttura della tabella `game_user`
--

CREATE TABLE `game_user` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `game_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `game_user`
--

INSERT INTO `game_user` (`id`, `user_id`, `game_id`, `created_at`, `updated_at`) VALUES
(3, 1, 10, '2021-06-06 18:04:25', '2021-06-06 18:04:25'),
(4, 1, 9, '2021-06-06 18:05:16', '2021-06-06 18:05:16'),
(8, 1, 3, '2021-06-06 18:06:25', '2021-06-06 18:06:25'),
(10, 1, 1, '2021-06-06 18:09:10', '2021-06-06 18:09:10'),
(13, 1, 4, '2021-06-06 18:09:21', '2021-06-06 18:09:21'),
(21, 1, 11, '2021-06-06 18:26:37', '2021-06-06 18:26:37'),
(22, 1, 2, '2021-06-06 18:26:55', '2021-06-06 18:26:55');

-- --------------------------------------------------------

--
-- Struttura della tabella `halls`
--

CREATE TABLE `halls` (
  `id` int(11) NOT NULL,
  `nome` varchar(6) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `halls`
--

INSERT INTO `halls` (`id`, `nome`, `created_at`, `updated_at`) VALUES
(1, 'SalaA', '2021-05-31 16:21:12', '2021-05-31 16:21:12'),
(2, 'SalaC', '2021-05-31 16:21:12', '2021-05-31 16:21:12'),
(3, 'SalaF', '2021-05-31 16:21:12', '2021-05-31 16:21:12'),
(4, 'SalaQ', '2021-05-31 16:21:12', '2021-05-31 16:21:12');

-- --------------------------------------------------------

--
-- Struttura della tabella `past_uses`
--

CREATE TABLE `past_uses` (
  `id` int(11) NOT NULL,
  `game_id` int(11) DEFAULT NULL,
  `emplacement_id` int(11) DEFAULT NULL,
  `card_id` int(11) DEFAULT NULL,
  `inizio` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `past_uses`
--

INSERT INTO `past_uses` (`id`, `game_id`, `emplacement_id`, `card_id`, `inizio`, `created_at`, `updated_at`) VALUES
(1, 1, 15, 1, '2020-12-16 15:40:00', '2021-05-31 17:22:16', '2021-05-31 17:22:16'),
(2, 1, 15, 4, '2020-12-16 17:40:00', '2021-05-31 17:22:16', '2021-05-31 17:22:16'),
(3, 2, 15, 3, '2020-12-16 16:30:00', '2021-05-31 17:22:16', '2021-05-31 17:22:16'),
(4, 3, 15, 5, '2020-12-16 17:20:00', '2021-05-31 17:22:16', '2021-05-31 17:22:16'),
(5, 6, 7, 1, '2020-12-16 18:10:00', '2021-05-31 17:22:16', '2021-05-31 17:22:16'),
(6, 8, 7, 5, '2020-12-16 17:10:00', '2021-05-31 17:22:16', '2021-05-31 17:22:16'),
(7, 8, 9, 6, '2020-12-16 16:35:00', '2021-05-31 17:22:16', '2021-05-31 17:22:16'),
(8, 10, 9, 3, '2020-12-16 17:35:00', '2021-05-31 17:22:16', '2021-05-31 17:22:16'),
(9, 12, 1, 5, '2020-12-16 17:50:00', '2021-05-31 17:22:16', '2021-05-31 17:22:16'),
(10, 15, 1, 1, '2020-12-16 16:50:00', '2021-05-31 17:22:16', '2021-05-31 17:22:16'),
(11, 18, 12, 5, '2020-12-16 17:40:00', '2021-05-31 17:22:16', '2021-05-31 17:22:16'),
(12, 20, 12, 2, '2020-12-16 16:00:00', '2021-05-31 17:22:16', '2021-05-31 17:22:16'),
(22, 11, 1, 3, '2020-12-17 17:20:00', '2021-05-31 17:22:16', '2021-05-31 17:22:16'),
(23, 1, 13, 1, '2020-12-17 17:40:00', '2021-05-31 17:22:16', '2021-05-31 17:22:16'),
(24, 3, 15, 1, '2020-12-17 16:31:00', '2021-05-31 17:22:16', '2021-05-31 17:22:16'),
(25, 12, 1, 1, '2020-12-17 17:43:28', '2021-05-31 17:22:16', '2021-05-31 17:22:16'),
(26, 6, 7, 2, '2020-12-17 17:10:00', '2021-05-31 17:22:16', '2021-05-31 17:22:16'),
(27, 7, 7, 2, '2020-12-17 17:10:00', '2021-05-31 17:22:16', '2021-05-31 17:22:16'),
(28, 19, 12, 2, '2020-12-17 16:00:00', '2021-05-31 17:22:16', '2021-05-31 17:22:16'),
(29, 5, 15, 3, '2020-12-17 17:40:00', '2021-05-31 17:22:16', '2021-05-31 17:22:16'),
(30, 9, 9, 4, '2020-12-17 17:35:00', '2021-05-31 17:22:16', '2021-05-31 17:22:16'),
(33, 1, 15, 1, '2020-12-17 17:56:09', '2021-05-31 17:22:16', '2021-05-31 17:22:16'),
(34, 1, 15, 1, '2020-12-19 09:35:00', '2021-05-31 17:22:16', '2021-05-31 17:22:16'),
(35, 8, 9, 1, '2020-12-19 08:35:00', '2021-05-31 17:22:16', '2021-05-31 17:22:16'),
(36, 8, 7, 2, '2020-12-19 09:10:00', '2021-05-31 17:22:16', '2021-05-31 17:22:16'),
(37, 12, 1, 2, '2020-12-19 08:50:00', '2021-05-31 17:22:16', '2021-05-31 17:22:16'),
(38, 18, 12, 2, '2020-12-19 08:50:00', '2021-05-31 17:22:16', '2021-05-31 17:22:16'),
(39, 1, 15, 3, '2020-12-19 08:40:00', '2021-05-31 17:22:16', '2021-05-31 17:22:16'),
(40, 3, 15, 3, '2020-12-19 08:20:00', '2021-05-31 17:22:16', '2021-05-31 17:22:16'),
(41, 2, 15, 4, '2020-12-19 09:30:00', '2021-05-31 17:22:16', '2021-05-31 17:22:16'),
(42, 10, 9, 4, '2020-12-19 09:35:00', '2021-05-31 17:22:16', '2021-05-31 17:22:16'),
(43, 1, 15, 5, '2020-12-19 08:40:00', '2021-05-31 17:22:16', '2021-05-31 17:22:16'),
(44, 6, 7, 5, '2020-12-19 10:10:00', '2021-05-31 17:22:16', '2021-05-31 17:22:16'),
(45, 15, 1, 5, '2020-12-19 08:50:00', '2021-05-31 17:22:16', '2021-05-31 17:22:16'),
(46, 20, 12, 6, '2020-12-19 10:35:00', '2021-05-31 17:22:16', '2021-05-31 17:22:16'),
(47, 1, 15, 1, '2021-06-01 12:52:12', '2021-06-01 14:43:25', '2021-06-01 14:43:25'),
(48, 3, 15, 1, '2021-06-01 16:45:31', '2021-06-01 15:10:54', '2021-06-01 15:10:54');

-- --------------------------------------------------------

--
-- Struttura della tabella `quiz_games`
--

CREATE TABLE `quiz_games` (
  `id` int(11) NOT NULL,
  `game_id` int(11) DEFAULT NULL,
  `argomento` varchar(30) DEFAULT NULL,
  `n_domande` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `quiz_games`
--

INSERT INTO `quiz_games` (`id`, `game_id`, `argomento`, `n_domande`, `created_at`, `updated_at`) VALUES
(1, 16, 'Generico', 20, '2021-05-31 16:45:34', '2021-05-31 16:45:34'),
(2, 17, 'Attualita', 10, '2021-05-31 16:45:34', '2021-05-31 16:45:34'),
(3, 18, 'Film e serie tv', 15, '2021-05-31 16:45:34', '2021-05-31 16:45:34'),
(4, 19, 'Generico', 5, '2021-05-31 16:45:34', '2021-05-31 16:45:34'),
(5, 20, 'A scelta', 10, '2021-05-31 16:45:34', '2021-05-31 16:45:34');

-- --------------------------------------------------------

--
-- Struttura della tabella `racing_games`
--

CREATE TABLE `racing_games` (
  `id` int(11) NOT NULL,
  `game_id` int(11) DEFAULT NULL,
  `tipo_gara` varchar(30) DEFAULT NULL,
  `tempo_record` time DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `racing_games`
--

INSERT INTO `racing_games` (`id`, `game_id`, `tipo_gara`, `tempo_record`, `created_at`, `updated_at`) VALUES
(1, 6, 'F1', '00:01:45', '2021-05-31 16:42:39', '2021-05-31 16:42:39'),
(2, 7, 'Rally', '00:03:00', '2021-05-31 16:42:39', '2021-05-31 16:42:39'),
(3, 8, 'F1', '00:01:20', '2021-05-31 16:42:39', '2021-05-31 16:42:39'),
(4, 9, 'MotoGp', '00:02:09', '2021-05-31 16:42:39', '2021-05-31 16:42:39'),
(5, 10, 'Nascar', '00:00:30', '2021-05-31 16:42:39', '2021-05-31 16:42:39');

-- --------------------------------------------------------

--
-- Struttura della tabella `registers`
--

CREATE TABLE `registers` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `card_id` int(11) DEFAULT NULL,
  `inizio` datetime DEFAULT NULL,
  `fine` datetime NOT NULL DEFAULT current_timestamp(),
  `punteggio` int(11) DEFAULT 0,
  `sconto` decimal(5,2) DEFAULT 0.00,
  `spesa` decimal(5,2) DEFAULT 5.00,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `registers`
--

INSERT INTO `registers` (`id`, `user_id`, `card_id`, `inizio`, `fine`, `punteggio`, `sconto`, `spesa`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '2020-12-16 15:30:00', '2020-12-16 18:32:31', 50, '0.00', '20.00', '2021-05-31 16:21:01', '2021-05-31 16:21:01'),
(2, 1, 1, '2020-12-17 16:30:00', '2020-12-17 17:43:43', 62, '11.50', '8.85', '2021-05-31 16:21:01', '2021-05-31 16:21:01'),
(3, 1, 1, '2020-12-17 17:56:05', '2020-12-17 17:56:13', 10, '0.00', '5.00', '2021-05-31 16:21:01', '2021-05-31 16:21:01'),
(4, 1, 5, '2020-12-19 08:00:00', '2020-12-19 10:50:44', 120, '22.50', '11.63', '2021-05-31 16:21:01', '2021-05-31 16:21:01'),
(5, 2, 2, '2020-12-17 16:45:00', '2020-12-17 17:43:43', 40, '0.00', '5.00', '2021-05-31 16:21:01', '2021-05-31 16:21:01'),
(6, 2, 3, '2020-12-19 08:00:00', '2020-12-19 10:50:44', 180, '32.50', '10.13', '2021-05-31 16:21:01', '2021-05-31 16:21:01'),
(7, 3, 3, '2020-12-16 16:00:00', '2020-12-16 18:32:31', 125, '22.50', '11.63', '2021-05-31 16:21:01', '2021-05-31 16:21:01'),
(8, 3, 4, '2020-12-19 08:30:00', '2020-12-19 10:50:44', 350, '42.50', '8.63', '2021-05-31 16:21:01', '2021-05-31 16:21:01'),
(9, 4, 2, '2020-12-19 08:45:00', '2020-12-19 10:50:44', 20, '0.00', '15.00', '2021-05-31 16:21:01', '2021-05-31 16:21:01'),
(10, 4, 3, '2020-12-17 16:00:00', '2020-12-17 17:43:43', 10, '0.00', '10.00', '2021-05-31 16:21:01', '2021-05-31 16:21:01'),
(11, 4, 5, '2020-12-16 17:00:00', '2020-12-16 18:32:31', 650, '52.50', '4.75', '2021-05-31 16:21:01', '2021-05-31 16:21:01'),
(12, 5, 2, '2020-12-16 15:45:00', '2020-12-16 18:32:31', 75, '11.50', '13.27', '2021-05-31 16:21:01', '2021-05-31 16:21:01'),
(13, 6, 4, '2020-12-16 17:30:00', '2020-12-16 18:32:31', 118, '22.50', '7.75', '2021-05-31 16:21:01', '2021-05-31 16:21:01'),
(14, 6, 6, '2020-12-19 10:30:00', '2020-12-19 10:50:45', 67, '11.50', '4.43', '2021-05-31 16:21:01', '2021-05-31 16:21:01'),
(15, 7, 4, '2020-12-17 16:30:00', '2020-12-17 17:43:44', 111, '22.50', '7.75', '2021-05-31 16:21:01', '2021-05-31 16:21:01'),
(16, 7, 6, '2020-12-16 16:30:00', '2020-12-16 18:32:32', 400, '42.50', '8.63', '2021-05-31 16:21:01', '2021-05-31 16:21:01'),
(17, 10, 1, '2020-12-16 18:34:00', '2020-12-16 18:35:12', 0, '0.00', '5.00', '2021-05-31 16:21:01', '2021-05-31 16:21:01'),
(18, 10, 1, '2020-12-19 08:30:00', '2020-12-19 10:50:34', 110, '22.50', '11.63', '2021-05-31 16:21:01', '2021-05-31 16:21:01');

--
-- Trigger `registers`
--
DELIMITER $$
CREATE TRIGGER `trig2` BEFORE INSERT ON `registers` FOR EACH ROW Begin 
If not exists(select * from cards where id=new.card_id and user_id=new.user_id)
Then signal SQLSTATE '45000' set message_text='tale scheda non è associata a nessun cf';
End if;
End
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `trig3d` AFTER DELETE ON `registers` FOR EACH ROW Begin 
Update users set punti_totali=punti_totali-old.punteggio where id=old.user_id;
End
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `trig3i` AFTER INSERT ON `registers` FOR EACH ROW Begin 
Update users set punti_totali=punti_totali+new.punteggio where id=new.user_id;
update cards set inizio=default, user_id=default where id=new.card_id;
Delete from current_uses where card_id=new.card_id;
End
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Struttura della tabella `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(20) DEFAULT NULL,
  `password` varchar(60) DEFAULT NULL,
  `nome` varchar(50) DEFAULT NULL,
  `anno_nascita` date DEFAULT NULL,
  `occupazione` varchar(30) DEFAULT NULL,
  `punti_totali` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `nome`, `anno_nascita`, `occupazione`, `punti_totali`, `created_at`, `updated_at`) VALUES
(1, 'bbc99', '$2y$10$rzMrWweRHNw/20gn4bC.F.VuhYF77ow3ps.Cti5FR3uV2a9bqVnBG', 'Manuel Calle', '1999-09-03', 'studente', 242, '2021-05-31 15:10:40', '2021-05-31 15:10:40'),
(2, 'bbn9', '$2y$10$SqMBaLRM5n2IN7IajVUoG.9Sc.xNvcPMH3SlRi.bPK/7mrrMtlKxu', 'Fabio Nicosia', '1990-07-30', 'BioMedico', 220, '2021-05-31 15:10:40', '2021-05-31 15:10:40'),
(3, 'bccc79', '$2y$10$e7NJDcmlxu775a2T2y3rJuIPFcHBSDVk2WpJREjqJJE8an1yuvZkS', 'Alessandra Garaffo', '1979-02-11', 'Psicologo', 475, '2021-05-31 15:10:40', '2021-05-31 15:10:40'),
(4, 'bln01', '$2y$10$P4d4rcfZ7.DaQ3B4q7fPM.w98WdNHxwrgDmo/CTANMfT40Zq9mFY.', 'Francesca Didio', '2001-07-08', 'Studente', 680, '2021-05-31 15:10:40', '2021-05-31 15:10:40'),
(5, 'llpc01', '$2y$10$nl6xA2Y5rDc5IoZZuTOaZen1QVSoJefBa5A3Sr1XgXHaHOQ2nBPt.', 'Paola Gullotta', '1995-09-11', 'Dentista', 75, '2021-05-31 15:10:40', '2021-05-31 15:10:40'),
(6, 'lmn98', '$2y$10$MCilTHlrwfDDz8VyYxPhtu2vwcdrlQ07jj0xcOT0NBj7W1/fIoBT.', 'Fancesco Fichera', '1998-03-22', 'youtuber', 185, '2021-05-31 15:10:40', '2021-05-31 15:10:40'),
(7, 'mcr77', '$2y$10$ScW5j9ug3ZFVkwDMYdkzwOWSdsGIGV9OsxEPxaif3.BgClKtYzDpe', 'Guglielmo Cantone', '1965-08-16', 'Imprenditore', 511, '2021-05-31 15:10:40', '2021-05-31 15:10:40'),
(8, 'sylvia', '$2y$10$6dxKW.FUnCfy7CteuBE1l.Az4b/Mm/W4I4oOSYIGZPCATKe4FYOgK', 'francesca corrao', '1999-07-08', 'studente', 0, '2021-05-31 15:10:40', '2021-05-31 15:10:40'),
(9, 'TheGarbage', '$2y$10$KhRBmOlrlBKHUTZa.6sOR.Xdj55eytZD5FZHIA7RUdY6aXseLn9f.', 'Davide Bucchieri', '1999-05-27', 'studente', 0, '2021-05-31 15:10:40', '2021-05-31 15:10:40'),
(10, 'yuv7', '$2y$10$8bmkQpnW2OAX.jyNnOaxMO2l7PknemFxvj6Qd2996Y27fbjKpedXC', 'Paola Valenti', '1969-09-11', 'Architetto', 110, '2021-05-31 15:10:40', '2021-05-31 15:10:40'),
(11, 'prova', '$2y$10$eRBaQKn/33cJdx8McCnp1uAdapaEBPoTK5RsK3NY4p27Nul8aSvCm', 'prova', '0011-11-11', 'prova', 0, '2021-06-05 08:44:16', '2021-06-05 08:44:16');

-- --------------------------------------------------------

--
-- Struttura stand-in per le viste `vista1`
-- (Vedi sotto per la vista effettiva)
--
CREATE TABLE `vista1` (
`user_id` int(11)
,`username` varchar(20)
,`punti_totali` int(11)
,`occupazione` varchar(30)
,`anno_nascita` date
,`media_punteggio` decimal(7,2)
,`media_sconto` decimal(5,2)
,`media_spesa` decimal(5,2)
,`totale_spesa` decimal(27,2)
,`N_fps` varchar(21)
,`N_arcade` varchar(21)
,`N_corsa` varchar(21)
,`N_quiz` varchar(21)
);

-- --------------------------------------------------------

--
-- Struttura stand-in per le viste `vista2`
-- (Vedi sotto per la vista effettiva)
--
CREATE TABLE `vista2` (
`username` varchar(20)
,`game_id` int(11)
,`titolo` varchar(30)
,`pegi` int(11)
,`n_avvi` bigint(21)
);

-- --------------------------------------------------------

--
-- Struttura per vista `cronologia`
--
DROP TABLE IF EXISTS `cronologia`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `cronologia`  AS SELECT `a`.`id` AS `id`, `b`.`username` AS `username`, `a`.`card_id` AS `card_id`, `a`.`inizio` AS `inizio`, `a`.`fine` AS `fine`, `a`.`punteggio` AS `punteggio`, `a`.`sconto` AS `sconto`, `a`.`spesa` AS `spesa` FROM (`registers` `a` join (select `users`.`id` AS `id`,`users`.`username` AS `username` from `users`) `b` on(`a`.`user_id` = `b`.`id`)) ;

-- --------------------------------------------------------

--
-- Struttura per vista `vista1`
--
DROP TABLE IF EXISTS `vista1`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vista1`  AS SELECT `p`.`id` AS `user_id`, `p`.`username` AS `username`, `p`.`punti_totali` AS `punti_totali`, `p`.`occupazione` AS `occupazione`, `p`.`anno_nascita` AS `anno_nascita`, cast(avg(`s`.`punteggio`) as decimal(7,2)) AS `media_punteggio`, cast(avg(`s`.`sconto`) as decimal(5,2)) AS `media_sconto`, cast(avg(`s`.`spesa`) as decimal(5,2)) AS `media_spesa`, sum(`s`.`spesa`) AS `totale_spesa`, coalesce(`f`.`N_fps`,'0') AS `N_fps`, coalesce(`a`.`N_arcade`,'0') AS `N_arcade`, coalesce(`c`.`N_corsa`,'0') AS `N_corsa`, coalesce(`q`.`N_quiz`,'0') AS `N_quiz` FROM ((((((select `users`.`id` AS `id`,`users`.`username` AS `username`,`users`.`punti_totali` AS `punti_totali`,`users`.`occupazione` AS `occupazione`,`users`.`anno_nascita` AS `anno_nascita` from `users`) `p` join (select `cronologia`.`id` AS `id`,`cronologia`.`username` AS `username`,`cronologia`.`sconto` AS `sconto`,`cronologia`.`punteggio` AS `punteggio`,`cronologia`.`spesa` AS `spesa` from `cronologia`) `s` on(`p`.`username` = `s`.`username`)) left join (select `a`.`username` AS `username`,count(0) AS `N_fps` from (`vista2` `a` join `fps_games` `b` on(`a`.`game_id` = `b`.`game_id`)) group by `a`.`username`) `f` on(`f`.`username` = `p`.`username`)) left join (select `a`.`username` AS `username`,count(0) AS `N_arcade` from (`vista2` `a` join `arcade_games` `b` on(`a`.`game_id` = `b`.`game_id`)) group by `a`.`username`) `a` on(`a`.`username` = `p`.`username`)) left join (select `a`.`username` AS `username`,count(0) AS `N_corsa` from (`vista2` `a` join `racing_games` `b` on(`a`.`game_id` = `b`.`game_id`)) group by `a`.`username`) `c` on(`c`.`username` = `p`.`username`)) left join (select `a`.`username` AS `username`,count(0) AS `N_quiz` from (`vista2` `a` join `quiz_games` `b` on(`a`.`game_id` = `b`.`game_id`)) group by `a`.`username`) `q` on(`q`.`username` = `p`.`username`)) GROUP BY `p`.`id` ;

-- --------------------------------------------------------

--
-- Struttura per vista `vista2`
--
DROP TABLE IF EXISTS `vista2`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vista2`  AS SELECT `o`.`username` AS `username`, `v`.`id` AS `game_id`, `v`.`titolo` AS `titolo`, `v`.`pegi` AS `pegi`, `o`.`n_avvi` AS `n_avvi` FROM (`games` `v` join (select `c`.`username` AS `username`,`o`.`game_id` AS `game_id`,count(0) AS `n_avvi` from ((select `a`.`game_id` AS `game_id`,`a`.`emplacement_id` AS `emplacement_id`,`a`.`card_id` AS `card_id`,`a`.`inizio` AS `inizio` from (select `current_uses`.`game_id` AS `game_id`,`current_uses`.`emplacement_id` AS `emplacement_id`,`current_uses`.`card_id` AS `card_id`,`current_uses`.`inizio` AS `inizio` from `current_uses`) `a` union (select `past_uses`.`game_id` AS `game_id`,`past_uses`.`emplacement_id` AS `emplacement_id`,`past_uses`.`card_id` AS `card_id`,`past_uses`.`inizio` AS `inizio` from `past_uses`)) `o` join `cronologia` `c` on(`o`.`card_id` = `c`.`card_id`)) where `c`.`inizio` < `o`.`inizio` and `c`.`fine` > `o`.`inizio` group by `o`.`game_id`,`c`.`username`) `o` on(`v`.`id` = `o`.`game_id`)) ;

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `arcade_games`
--
ALTER TABLE `arcade_games`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `game_id` (`game_id`);

--
-- Indici per le tabelle `cards`
--
ALTER TABLE `cards`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indici per le tabelle `contests`
--
ALTER TABLE `contests`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indici per le tabelle `current_uses`
--
ALTER TABLE `current_uses`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `game_id` (`game_id`,`emplacement_id`,`card_id`),
  ADD KEY `idx_game_id` (`game_id`),
  ADD KEY `idx_emplacement_id` (`emplacement_id`),
  ADD KEY `idx_card_id` (`card_id`);

--
-- Indici per le tabelle `emplacements`
--
ALTER TABLE `emplacements`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `numero` (`numero`,`hall_id`),
  ADD KEY `idx_sala_id` (`hall_id`);

--
-- Indici per le tabelle `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `inizio` (`inizio`,`event_type_id`,`game_id`),
  ADD KEY `idx_inizio` (`inizio`),
  ADD KEY `idx_event_type_id` (`event_type_id`),
  ADD KEY `idx_game_id` (`game_id`);

--
-- Indici per le tabelle `event_types`
--
ALTER TABLE `event_types`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nome` (`nome`);

--
-- Indici per le tabelle `fps_games`
--
ALTER TABLE `fps_games`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `game_id` (`game_id`);

--
-- Indici per le tabelle `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `game_user`
--
ALTER TABLE `game_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`,`game_id`),
  ADD KEY `idx_user_id` (`user_id`),
  ADD KEY `idx_game_id` (`game_id`);

--
-- Indici per le tabelle `halls`
--
ALTER TABLE `halls`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nome` (`nome`);

--
-- Indici per le tabelle `past_uses`
--
ALTER TABLE `past_uses`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `game_id` (`game_id`,`emplacement_id`,`card_id`,`inizio`),
  ADD KEY `idx_game_id` (`game_id`),
  ADD KEY `idx_emplacement_id` (`emplacement_id`),
  ADD KEY `idx_card_id` (`card_id`);

--
-- Indici per le tabelle `quiz_games`
--
ALTER TABLE `quiz_games`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `game_id` (`game_id`);

--
-- Indici per le tabelle `racing_games`
--
ALTER TABLE `racing_games`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `game_id` (`game_id`);

--
-- Indici per le tabelle `registers`
--
ALTER TABLE `registers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`,`card_id`,`inizio`),
  ADD KEY `idx_user_id` (`user_id`),
  ADD KEY `idx_card_id` (`card_id`),
  ADD KEY `idx_inizio` (`inizio`);

--
-- Indici per le tabelle `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user` (`username`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `arcade_games`
--
ALTER TABLE `arcade_games`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT per la tabella `cards`
--
ALTER TABLE `cards`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT per la tabella `contests`
--
ALTER TABLE `contests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `current_uses`
--
ALTER TABLE `current_uses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT per la tabella `emplacements`
--
ALTER TABLE `emplacements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT per la tabella `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT per la tabella `event_types`
--
ALTER TABLE `event_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT per la tabella `fps_games`
--
ALTER TABLE `fps_games`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT per la tabella `games`
--
ALTER TABLE `games`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT per la tabella `game_user`
--
ALTER TABLE `game_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT per la tabella `halls`
--
ALTER TABLE `halls`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT per la tabella `past_uses`
--
ALTER TABLE `past_uses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT per la tabella `quiz_games`
--
ALTER TABLE `quiz_games`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT per la tabella `racing_games`
--
ALTER TABLE `racing_games`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT per la tabella `registers`
--
ALTER TABLE `registers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT per la tabella `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `arcade_games`
--
ALTER TABLE `arcade_games`
  ADD CONSTRAINT `arcade_games_ibfk_1` FOREIGN KEY (`game_id`) REFERENCES `games` (`id`);

--
-- Limiti per la tabella `cards`
--
ALTER TABLE `cards`
  ADD CONSTRAINT `cards_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Limiti per la tabella `contests`
--
ALTER TABLE `contests`
  ADD CONSTRAINT `contests_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Limiti per la tabella `current_uses`
--
ALTER TABLE `current_uses`
  ADD CONSTRAINT `current_uses_ibfk_1` FOREIGN KEY (`game_id`) REFERENCES `games` (`id`),
  ADD CONSTRAINT `current_uses_ibfk_2` FOREIGN KEY (`emplacement_id`) REFERENCES `emplacements` (`id`),
  ADD CONSTRAINT `current_uses_ibfk_3` FOREIGN KEY (`card_id`) REFERENCES `cards` (`id`);

--
-- Limiti per la tabella `emplacements`
--
ALTER TABLE `emplacements`
  ADD CONSTRAINT `emplacements_ibfk_1` FOREIGN KEY (`hall_id`) REFERENCES `halls` (`id`);

--
-- Limiti per la tabella `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `events_ibfk_1` FOREIGN KEY (`event_type_id`) REFERENCES `event_types` (`id`),
  ADD CONSTRAINT `events_ibfk_2` FOREIGN KEY (`game_id`) REFERENCES `games` (`id`);

--
-- Limiti per la tabella `fps_games`
--
ALTER TABLE `fps_games`
  ADD CONSTRAINT `fps_games_ibfk_1` FOREIGN KEY (`game_id`) REFERENCES `games` (`id`);

--
-- Limiti per la tabella `game_user`
--
ALTER TABLE `game_user`
  ADD CONSTRAINT `game_user_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `game_user_ibfk_2` FOREIGN KEY (`game_id`) REFERENCES `games` (`id`);

--
-- Limiti per la tabella `past_uses`
--
ALTER TABLE `past_uses`
  ADD CONSTRAINT `past_uses_ibfk_1` FOREIGN KEY (`game_id`) REFERENCES `games` (`id`),
  ADD CONSTRAINT `past_uses_ibfk_2` FOREIGN KEY (`emplacement_id`) REFERENCES `emplacements` (`id`),
  ADD CONSTRAINT `past_uses_ibfk_3` FOREIGN KEY (`card_id`) REFERENCES `cards` (`id`);

--
-- Limiti per la tabella `quiz_games`
--
ALTER TABLE `quiz_games`
  ADD CONSTRAINT `quiz_games_ibfk_1` FOREIGN KEY (`game_id`) REFERENCES `games` (`id`);

--
-- Limiti per la tabella `racing_games`
--
ALTER TABLE `racing_games`
  ADD CONSTRAINT `racing_games_ibfk_1` FOREIGN KEY (`game_id`) REFERENCES `games` (`id`);

--
-- Limiti per la tabella `registers`
--
ALTER TABLE `registers`
  ADD CONSTRAINT `registers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `registers_ibfk_2` FOREIGN KEY (`card_id`) REFERENCES `cards` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
