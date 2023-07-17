const { sequelize, user, patient, workspace, drug, drugSynonym, drugDescription, drugDescriptionSynonym, selectedWorkspace, consultation } = require('../models');
const { hash } = require('../services/bcrypt-service')

const mocData = async () => {

    await sequelize.sync({ force: true })

    const hasedPassword = await hash("123456")

    await user.bulkCreate([
        {
            username: "nmry",
            password: hasedPassword,
            firstName: "naeramit",
            lastName: "ridtiya",
            gender: 1,
            role: 1,
            status: 2
        },
        {
            username: "SAWADDEE",
            password: hasedPassword,
            firstName: "สวัสดี",
            lastName: "มีสุข",
            gender: 1,
            role: 2,
            licenseNumber: "ว.51856",
            status: 2
        },
        {
            username: "SABUYDEE",
            password: hasedPassword,
            firstName: "สบายดี",
            lastName: "มีสุข",
            gender: 2,
            role: 4,
            licenseNumber: "9876543210",
            status: 2
        },

    ])

    await patient.bulkCreate([
        {
            firstName: "กานดา",
            lastName: "มาสาย",
            gender: 1,
            healthInsurance: 1,
            birthdate: "1991-01-01 00:00:00+00:00"
        },
        {
            firstName: "มานี",
            lastName: "มีเวลา",
            gender: 2,
            healthInsurance: 1,
            birthdate: "1989-01-01 00:00:00+00:00"
        },
        {
            firstName: "มานะ",
            lastName: "สาระดี",
            gender: 1,
            healthInsurance: 1,
            birthdate: "1989-01-01 00:00:00+00:00"
        },
        {
            firstName: "ประยุทธ์",
            lastName: "จันโอชะ",
            gender: 1,
            healthInsurance: 1,
            birthdate: "1969-01-01 00:00:00+00:00"
        },
        {
            firstName: "ประวิท",
            lastName: "ยืมเพื่อนมา",
            gender: 1,
            healthInsurance: 1,
            birthdate: "1969-01-01 00:00:00+00:00"
        }
    ])

    await workspace.bulkCreate([
        {
            name: "OPD GP",
            type: 1
        },
        {
            name: "OPD MED",
            type: 1
        },
        {
            name: "OPD PED",
            type: 1
        },
        {
            name: "ER",
            type: 2
        },
        {
            name: "IPD MED",
            type: 3
        },
        {
            name: "IPD PED",
            type: 3
        },
    ])

    await drug.bulkCreate([
        {
            name: "Paracetomol 500 mg",
            status: 1,
            costPerUnit: 0.5
        },
        {
            name: "Paracetomol 325 mg",
            status: 1,
            costPerUnit: 1
        },
        {
            name: "Ibuprofen 400 mg",
            status: 1,
            costPerUnit: 1
        }
    ])

    await drugSynonym.bulkCreate([
        {
            synonym: "Paracetomol 500 mg",
            drugId: 1
        },
        {
            synonym: "Paracetomol(500)",
            drugId: 1
        },
        {
            synonym: "Para(500)",
            drugId: 1
        },
        {
            synonym: "Paracetomol 325 mg",
            drugId: 2
        },
        {
            synonym: "Paracetomol(325)",
            drugId: 2
        },
        {
            synonym: "Para(325)",
            drugId: 2
        },
        {
            synonym: "Ibuprofen 400 mg",
            drugId: 3
        },
        {
            synonym: "Ibuprofen(400)",
            drugId: 3
        },
        {
            synonym: "Ibu(400)",
            drugId: 3
        },
    ])

    await drugDescription.bulkCreate([
        {
            description: "รับประทานครั้งละ 1 เม็ด เมิ่อมีอาการปวด ทุก 4-6 ชั่วโมง"
        },
        {
            description: "รับประทานครั้งละ 1 เม็ด เมิ่อมีอาการปวด ทุก 6 ชั่วโมง"
        },
        {
            description: "รับประทานครั้งละ 1 เม็ด เมิ่อมีอาการปวด ทุก 8 ชั่วโมง"
        },
        {
            description: "รับประทานครั้งละ 1.5 เม็ด เมิ่อมีอาการปวด ทุก 4-6 ชั่วโมง"
        },
        {
            description: "รับประทานครั้งละ 1.5 เม็ด เมิ่อมีอาการปวด ทุก 6 ชั่วโมง"
        },
        {
            description: "รับประทานครั้งละ 1.5 เม็ด เมิ่อมีอาการปวด ทุก 8 ชั่วโมง"
        },
        {
            description: "รับประทานครั้งละ 2 เม็ด เมิ่อมีอาการปวด ทุก 4-6 ชั่วโมง"
        },
        {
            description: "รับประทานครั้งละ 2 เม็ด เมิ่อมีอาการปวด ทุก 6 ชั่วโมง"
        },
        {
            description: "รับประทานครั้งละ 2 เม็ด เมิ่อมีอาการปวด ทุก 8 ชั่วโมง"
        },
    ])

    await drugDescriptionSynonym.bulkCreate([
        {
            synonym: "รับประทานครั้งละ 1 เม็ด เมิ่อมีอาการปวด ทุก 4-6 ชั่วโมง",
            drugDescriptionId: 1
        },
        {
            synonym: "1 tab o prn q 4-6 hr ",
            drugDescriptionId: 1
        },
        {
            synonym: "1 toq 4-6 hr ",
            drugDescriptionId: 1
        },
        {
            synonym: "1 toq 4-6 ",
            drugDescriptionId: 1
        },
        {
            synonym: "รับประทานครั้งละ 1 เม็ด เมิ่อมีอาการปวด ทุก 6 ชั่วโมง",
            drugDescriptionId: 2
        },
        {
            synonym: "1 tab o prn q 6 hr ",
            drugDescriptionId: 2
        },
        {
            synonym: "1 toq 6 hr ",
            drugDescriptionId: 2
        },
        {
            synonym: "1 toq 6 ",
            drugDescriptionId: 2
        },
        {
            synonym: "รับประทานครั้งละ 1 เม็ด เมิ่อมีอาการปวด ทุก 8 ชั่วโมง",
            drugDescriptionId: 3
        },
        {
            synonym: "1 tab o prn q 8 hr ",
            drugDescriptionId: 3
        },
        {
            synonym: "1 toq 8 hr ",
            drugDescriptionId: 3
        },
        {
            synonym: "1 toq 8 ",
            drugDescriptionId: 3
        },

    ])

    await selectedWorkspace.bulkCreate([
        { userId: 2, workspaceId: 1 },
        { userId: 2, workspaceId: 4 },
        { userId: 2, workspaceId: 5 },
        { userId: 3, workspaceId: 1 },
        { userId: 3, workspaceId: 2 },
    ])

    await consultation.bulkCreate([
        { cc: "ปวดศีรษะ 1 moPTA", createdUserId: 3, workspaceId: 1, patientId: 1 },
        { cc: "ปวดขา 1 moPTA", createdUserId: 3, workspaceId: 1, patientId: 2 },
        { cc: "นัดตรวจ IHD", createdUserId: 3, workspaceId: 1, patientId: 3 },
        { cc: "ปวดใจ  1 moPTA", createdUserId: 3, workspaceId: 1, patientId: 4 },
        { cc: "นอนไม่หลับ  1 moPTA", createdUserId: 3, workspaceId: 1, patientId: 5 },
    ])
}

try {
    mocData()

} catch (err) {
    console.log(err)
}