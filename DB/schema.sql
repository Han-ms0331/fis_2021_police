 

CREATE TABLE center(
    center_id       BIGINT              NOT NULL    AUTO_INCREMENT      comment 'primary_key',
    c_sido          varchar(100)        NOT NULL                        comment '시도',
    c_sigungu	    varchar(100)        NOT NULL                        comment '시군구',                                                          
    c_name	        varchar(100)        NOT NULL                        comment '시설명',                                   
    c_type	        varchar(100)        NOT NULL                        comment '유형',                            
    c_status	    varchar(100)            NULL                        comment '운영현황',                                                     
    c_address	    varchar(100)        NOT NULL                        comment '주소',                                                    
    c_zipcode	    varchar(100)        NOT NULL                        comment '우편번호',                                            
    c_ph	        varchar(100)        NOT NULL                        comment '전화번호',                                            
    c_fax_num	    varchar(100)            NULL                        comment '팩스번호',                                              
    c_people	    varchar(100)            NULL                        comment '현원',                                             
    c_hp_address	varchar(100)            NULL                        comment '홈페이지주소',                                                 
    c_latitude	    varchar(100)            NULL                        comment '위도',                                 
    c_longitude     varchar(100)            NULL                        comment '경도',                                                             
    PRIMARY KEY (center_id)
);
        
INSERT INTO center( c_sido, c_sigungu, c_name, c_type, c_status, c_address, c_zipcode, c_ph, c_fax_num, c_people, c_hp_address, c_latitude, c_longitude )
VALUES ('경기도', '동안구', '땡땡어린이집', '국공립', '정상', '안양시 동안구 동안로 어쩌구', '00000', '031-000-0000', '031-000-0011', '20', 'https://뭐쩌고', '37.0', '127.0'); 

INSERT INTO center( c_sido, c_sigungu, c_name, c_type, c_status, c_address, c_zipcode, c_ph, c_fax_num, c_people, c_hp_address, c_latitude, c_longitude )
VALUES ('서울', '어디구', '땡땡유치원', '국공립', '정상', '서울 어디구 어쩌구', '00001', '02-000-0000', '02-000-0011', '20', 'https://뭐쩌고', '37.1', '127.1'); 



CREATE TABLE user(
    user_id         INT                 NOT NULL    AUTO_INCREMENT      comment 'primary_key',
    u_name          varchar(100)        NOT NULL                        comment '사용자 이름',
    u_pwd           varchar(100)        NOT NULL                        comment '사용자 비밀번호',
    u_ph            varchar(100)        NOT NULL                        comment '사용자 전화번호',
    PRIMARY KEY (user_id)
);

INSERT INTO user( u_name, u_pwd, u_ph) VALUES ('원보라user', '1234','010-4057-0750');
INSERT INTO user( u_name, u_pwd, u_ph) VALUES ('한명수user', '1234','010-2565-5898');




CREATE TABLE agent(
    agent_id        varchar(100)        NOT NULL                        comment 'primary_key',              //안양1, 안양2 이런식임
    a_name          varchar(100)        NOT NULL                        comment '현장 요원 이름',
    a_ph            varchar(100)        NOT NULL                        comment '현장 요원 전화번호',
    a_address       varchar(100)        NOT NULL                        comment '현장 요원 집 주소',
    a_latitude      varchar(100)        NOT NULL                        comment '현장 요원 위도',                         
    a_longitude     varchar(100)        NOT NULL                        comment '현장 요원 경도',                                                                   
    PRIMARY KEY (agent_id)
);

INSERT INTO agent( agent_id, a_name, a_ph, a_address, a_latitude, a_longitude ) VALUES ('안양1', '원보라agent', '010-7777-7777', '경기도 안양시', '37.0', '127.0');
INSERT INTO agent( agent_id, a_name, a_ph, a_address, a_latitude, a_longitude ) VALUES ('노원1', '고준영agent', '010-7777-7779', '서울시 노원구', '37.1', '127.1');






CREATE TABLE call_status(
    no              INT                 NOT NULL    AUTO_INCREMENT      comment 'primary_key',
    cid             BIGINT              NOT NULL                        comment 'center_id',
    uid             INT                 NOT NULL                        comment 'user_id',  
    date            varchar(100)        NOT NULL                        comment '입력날짜',
    participation   varchar(100)        NOT NULL                        comment '참여여부(참여/거부/보류/확정)',
    in_out          varchar(100)        NOT NULL                        comment '접수방법',
    c_manager       varchar(100)        NOT NULL                        comment '시설 담당자 성명',
    m_ph            varchar(100)        NOT NULL                        comment '시설 담당자 전화번호',
    m_email         varchar(100)        NOT NULL                        comment '시설 담당자 이메일 ',
    etc             varchar(300)        NOT NULL                        comment '기타 및 비고',
    today           varchar(300)        NOT NULL                        comment 'call 한 날짜',
    estimate_num    INT                     null                        comment '예상인원',
    PRIMARY KEY (no),
    FOREIGN key (cid) REFERENCES center(center_id),
    FOREIGN key (uid) REFERENCES user(user_id)
);

INSERT INTO call_status( cid, uid, date, participation, in_out, c_manager, m_ph, m_email, etc ) 
VALUES (1, 1, '2021-05-06', '참여', 'in', '담당자이름', '010-1234-5678', 'email@gmail.com', '9시에는 안됨');

ALTER TABLE call_status MODIFY date varchar(100);

alter table call_status add estimate_num INT not null comment '예상인원';



CREATE TABLE apply_status(
    no              INT                 NOT NULL    AUTO_INCREMENT      comment 'primary_key',
    cid             BIGINT              NOT NULL                        comment 'center_id',
    uid             INT                 NOT NULL                        comment 'user_id',
    recept_date     varchar(100)        NOT NULL                        comment '접수일',
    collect         varchar(100)        NOT NULL                        comment '취합여부',        
    visit_date      varchar(100)        NOT NULL                        comment '방문날짜',                    
    visit_time      varchar(100)        NOT NULL                        comment '방문시간',                            
    estimate_num    varchar(100)        NOT NULL                        comment '예상인원',                
    aid             varchar(100)        NOT NULL                        comment '현장등록원',  
    latest          INT                 NOT NULL                        comment '가장 마지막 저장된 정보 1로 저장' ,                    
    etc             varchar(300)        NOT NULL                        comment '기타 및 비고',         
    PRIMARY KEY (no),
    FOREIGN key (cid) REFERENCES center(center_id),
    FOREIGN key (uid) REFERENCES user(user_id),
    FOREIGN key (aid) REFERENCES agent(agent_id)
);

alter table apply_status add foreign key (aid)
REFERENCES agent(agent_id) ON DELETE cascade ON UPDATE cascade;


FOREIGN key (aid) REFERENCES agent(agent_id) ON DELETE cascade ON UPDATE cascade,
alter table apply_status add latest INT not null comment '가장 마지막 저장된 정보 1로 저장'
alter table apply_status add etc varchar(300)  null comment '기타 및 비고';

ALTER TABLE apply_status MODIFY visit_date varchar(100);



INSERT INTO apply_status(cid, uid, recept_date, collect, visit_date, visit_time, estimate_num, aid)
VALUES (1,1,'2021-05-06', '완료','2021-06-10', '10:30', '30', '안양1');

INSERT INTO apply_status(cid, uid, recept_date, collect, visit_date, visit_time, estimate_num, aid)
VALUES (1,1,'2021-05-06', '완료','2021-06-10', '09:30', '50', '안양1');

INSERT INTO apply_status(cid, uid, recept_date, collect, visit_date, visit_time, estimate_num, aid)
VALUES (1,1,'2021-05-07', '완료','2021-06-11', '09:30', '20', '안양1');

INSERT INTO apply_status(cid, uid, recept_date, collect, visit_date, visit_time, estimate_num, aid,latest)
VALUES (1,1,'2021-05-07', '완료','2021-06-11', '12:30', '20', '안양1',1);



CREATE TABLE schedule(
    no              INT                 NOT NULL    AUTO_INCREMENT      comment 'primary_key',
    apply_no        INT                 NOT NULL                        comment 'apply_no',
    aid             varchar(100)        NOT NULL                        comment '현장등록원',   
    cid             BIGINT              NOT NULL                        comment 'center_id',
    PRIMARY KEY (no),
    FOREIGN key (apply_no) REFERENCES apply_status(no) ON DELETE cascade ON UPDATE cascade,
    FOREIGN key (aid) REFERENCES agent(agent_id),
    FOREIGN key (cid) REFERENCES center(center_id)
);
INSERT INTO schedule(apply_no, aid, cid)
VALUES (1,'안양1',1);

SELECT S.apply_no
FROM schedule AS S
WHERE S.visit_date = ${date}

SELECT S.aid, A.visit_time, A.estimate_num
FROM schedule AS S RIGHT JOIN apply_status AS A
ON A.no = ( SELECT S.apply_no
            FROM schedule AS S
            WHERE S.visit_date = ${date}
          )
ORDER BY A.visit_time;




SELECT S.aid, A.visit_time, A.estimate_num
FROM schedule AS S RIGHT JOIN apply_status AS A
ON S.apply_no = A.no AND A.visit_date = ${date}
ORDER BY A.visit_time;

SELECT C.c_name , C.c_address
FROM schedule AS S RIGHT JOIN center AS C
ON S.cid = C.center_id
ORDER BY A.visit_time;



SELECT aid, visit_time, estimate_num, cid
FROM apply_status
WHERE visit_date = '2021-06-10' AND latest = 1
ORDER BY visit_time;


SELECT  A1.no, A1.aid, A1.visit_time, A1.estimate_num, A1.cid
FROM apply_status as A1
(SELECT  max(no),aid, A1.visit_time, A1.estimate_num, A1.cid FROM apply_status GROUP BY cid) as A2
WHERE visit_date = '2021-06-10' AND A1.no = A2.no
ORDER BY visit_time;