import leaderAbilityMappings from "./leaderAbilityMappings.js"
import abilitiesMappings from "./abilitiesMappings.js"
import {skillTypes, activationTypes, hpRequirementTargetTypes, hpSkillTargetTypes} from './types.js'

const mainTeam = [{
	// id: '221004',
	// attack: 1174,
	id: '221002',
	attack: 669,
	skillDmg: 0,
	isAwakened: true,
	hp: 3679,
	maxHp: 3679,
	type: 'Blue',
	}, {
	id: '121004',
	attack: 1022,
	skillDmg: 800,
	hp: 3679,
	maxHp: 3679,
	type: 'Blue',
	}, {
	id: '321009',
	attack: 888,
	skillDmg: 400,
	hp: 3679,
	maxHp: 3679,
	type: 'Blue',
}]

const subTeam = ['121001', '221002', '311009']

function leaderSkillCheck(main) {
	if ((main.type === leaderAbilityMappings[main.id].elementForSkill) || (leaderAbilityMappings[main.id].elementForSkill === '(None)')) {
		if (main.isAwakened) {
			return Number(leaderAbilityMappings[main.id].skillValue_2)
		} else {
			return Number(leaderAbilityMappings[main.id].skillValue_1)
		}
	}
}

function skillCheck(char, data) {
	let total = 0
	// regular skill check
	if ((char.type === data.elementForSkill) || (data.elementForSkill === '(None)')) {
			return Number(data.skillValue_2)
	}
}

function healthCheck(char, data) {
	// health based skill check
	if ((char.type === data.elementforHPRelated) || (data.elementforHPRelated === '(None)')) {
		if (data.hpAboveOrBelow === 0) {
			if ((char.hp / char.maxHp) >= data.hpRequirement_2 ){
				console.log('2:', Number(data.hpAttackAdd_2))
				total += Number(data.hpAttackAdd_2)
			}
		} else if (data.hpAboveOrBelow === 1) {
			if ((char.hp / char.maxHp) <= data.hpRequirement_2 ){
				total += Number(data.hpAttackAdd_2)
			}
		}
	}
}

var globalBuffs = []

function calcUnitDmg(main, sub) {
	const dynamicInfo = {
		Skill_Base_Damage: main.skillDmg,
		Unit_Attack: main.attack,
		Attack_Percent_Modifier: 0,
		Skill_Attack_Multiplier: 1,
	}
	const isWeak = false
  const comboCount = 0
	const coffinCount = 0
	const buffCount = 0
	const rangeBonus = 0
	const isPowerFlip = false
	const powerFlipLevel = 0
	const statModifierPowerFlipDamage = 0
	const statModifierPowerFlipLvDamage = 0
	const statModifierSkillDamage = 0
	const isBreak = false
	const statModifierBreak = 0
	const totalEnemyResist = 0
	const Total_Resist = 0
	const hasDirectHit = false
	const statModifierDirectAttackDamage = 0
	const totalAdditionalDirectAttackHits = 0
	// get char stats
	// parse leader skills
	if (skillTypes[leaderAbilityMappings[main.id].skillType]) {
		dynamicInfo[skillTypes[leaderAbilityMappings[main.id].skillType]] += leaderSkillCheck(main)
	}
	// parse main abilitites
	for (let i = 1; i < 4; i += 1) {
		const data = abilitiesMappings[`${leaderAbilityMappings[main.id].name}_${i}`]
		if (skillTypes[data.skillType] ) {
			dynamicInfo[skillTypes[data.skillType]] += skillCheck(main, data)
		}
		if (hpSkillTargetTypes[data.hpSkillTarget]) {
			dynamicInfo[skillTypes[data.skillType]] += healthCheck(main, data)
		}
	}
	return (
		(dynamicInfo.Skill_Base_Damage + (dynamicInfo.Unit_Attack * (1 + (dynamicInfo.Attack_Percent_Modifier))) * (dynamicInfo.Skill_Attack_Multiplier)) // base dmg
	 * (isWeak ? 1.5 : 1) // elemental advantage
	 * ((comboCount !== 0) ? (1 + comboCount) : 1)
	 * ((coffinCount !== 0) ? (1 + coffinCount) : 1)
	 * ((buffCount !== 0) ? (1 + buffCount) : 1)
	 * ((isPowerFlip && statModifierPowerFlipDamage !== 0) ? (1 + statModifierPowerFlipDamage) : 1)
	 * ((isPowerFlip && (powerFlipLevel > 0) && statModifierPowerFlipLvDamage !== 0) ? (1 + statModifierPowerFlipLvDamage) : 1)
	 * ((statModifierSkillDamage !== 0) ? (1 + statModifierSkillDamage) : 1)
	 * ((isBreak) ? (1 + statModifierBreak) : 1)
	 * ((totalEnemyResist !== 0) ? (1 - totalEnemyResist) : 1)
	 * ((Total_Resist > 0) ? (1 / (1 + Total_Resist)) : (1 - Total_Resist))
	 * (hasDirectHit ? ((1 + statModifierDirectAttackDamage) + totalAdditionalDirectAttackHits) : 1)
	)
}

mainTeam.forEach((unit,index) => {
	console.log(calcUnitDmg(unit, subTeam[index]))
})

// * Total_Resist > 0 Then / (1 + Total_Resist) Else * (1 - Total_Resist)
// * enablesComboBonus ? (1 + CurrentCombo)
// * enablesCoffinCountBonus ? (1 + TotalCoffinCounts)
// * enablesBuffCountBonus ? (1 + TotalBuffCount)
// * enablesRangeBonus ? Distance^2
// * createdByDirectAttack ? ((1 + statModifierDirectAttackDamage) + totalDirectAttackConditionSlayer)
// * createdByPowerFlipAction ? (1 + statModifierPowerFlipDamage)
// * createdByPowerFlipAction AND ChargeLevel > 0 ? (1 + statModifierPowerFlipLvDamage)
// * createdBySkillAction ? (1 + statModifierSkillDamage)
// * targetHasPinch (break maybe?) ? (1 + statModifierPinchSlayer)
// * 1 - totalResistanceToConditionEnemies
// * (1 + (param2.statModifierAdditionalDirectAttackDamage)) / (param2.statModifierAdditionalDirectAttackTimes)
// - elementDamamgeCut???