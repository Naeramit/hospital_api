const express = require('express');

const userController = require('../controllers/user-controller')


const router = express.Router();





router.get('/:consultationId/history', userController.getHistory)
router.patch('/:consultationId/history', userController.updateHistory)

router.get('/:consultationId/diagnosis', userController.getAllDiagnosis)
router.post('/:consultationId/diagnosis', userController.addDiagnosis)
router.patch('/:consultationId/diagnosis/:diagnosisId', userController.updateDiagnosis)
router.delete('/:consultationId/diagnosis/:diagnosisId', userController.deleteDiagnosis)


router.get('/:consultationId/drugorder', userController.getAllDrugOrder)
router.post('/:consultationId/drugorder', userController.addDrugOrder)
router.patch('/:consultationId/drugorder/:drugorderId', userController.updateDrugOrder)
router.delete('/:consultationId/drugorder/:drugorderId', userController.deleteDrugOrder)

router.patch('/:consultationId/unattend', userController.unAttend)
router.patch('/:consultationId/discharge', userController.discharge)


module.exports = router;