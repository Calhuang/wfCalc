import leaderAbilityMappings from "./leaderAbilityMappings.js"
import abilitiesMappings from "./abilitiesMappings.js"
import {skillTypes, activationTypes, hpRequirementTargetTypes, hpSkillTargetTypes} from './types.js'

const mainTeam = [{
	id: '221004',
  name: 'alice',
	attack: 1010,
	skillDmg: 0,
	isAwakened: true,
	hp: 3679,
	maxHp: 3679,
	type: 'Blue',
  isPierce: false,
  isLevitate: false,
	}, {
	id: '121004',
  name: 'ice_witch',
	attack: 828,
	skillDmg: 0,
	hp: 3679,
	maxHp: 3679,
	type: 'Blue',
  isPierce: false,
  isLevitate: true,
	}, {
	id: '321009',
  'name': 'cute_fafnir',
	attack: 757,
	skillDmg: 0,
	hp: 3679,
	maxHp: 3679,
	type: 'Blue',
  isPierce: false,
  isLevitate: true,
}]

const subTeam = [{id: '121001'}, {id: '221002'}, {id: '311009'}]

var globalBuffs = []

function leaderSkillCheck(main) {
	if ((main.type === leaderAbilityMappings[main.id].elementForSkill) || (leaderAbilityMappings[main.id].elementForSkill === '(None)')) {
		// units that can receive the buff
    const glbBuffObj = {
      typing: (leaderAbilityMappings[main.id].elementForSkill === '(None)') ? 'All' : leaderAbilityMappings[main.id].elementForSkill,
      value: null,
      target: 'All'
    }
    if (main.isAwakened) {
			glbBuffObj.value = Number(leaderAbilityMappings[main.id].skillValue_2)
      return glbBuffObj
		} else {
      glbBuffObj.value = Number(leaderAbilityMappings[main.id].skillValue_1)
			return glbBuffObj
		}
	}
}

function skillCheck(char, data) {
  const glbBuffObj = {
    typing: (data.elementForSkill === '(None)') ? 'All' : data.elementForSkill,
    value: null,
    target: 'All'
  }
	// regular skill check
	if ((char.type === data.elementForSkill) || (data.elementForSkill === '(None)')) {
			glbBuffObj.value =  Number(data.skillValue_2)
      // check for skill secondary effect
      // if (data.nameSecond && data.nameSecond.length > 0) {
      //   if ((char.type === data.elementForSkill) || (data.elementForSkill === '(None)')) {
      //     glbBuffObj.value =  Number(data.skillValue_2)
      //   }
      // }
      return glbBuffObj
	}
}

function healthCheck(char, data, index, isSecond = false) {
	// health based skill check
  const elementforHPRelated = isSecond ? data.elementforHPRelatedSecond : data.elementforHPRelated
  const hpSkillTarget = isSecond ? data.hpSkillTargetSecond : data.hpSkillTarget
  const hpAboveOrBelow = isSecond ? data.hpAboveOrBelowSecond : data.hpAboveOrBelow
  const hpRequirement_2 = isSecond ? data.hpRequirementSecond_2 : data.hpRequirement_2
  const hpAttackAdd_2 = isSecond ? data.hpAttackAddSecond_2 : data.hpAttackAdd_2
  console.log(data)
	if ((char.type === elementforHPRelated) || (elementforHPRelated === '(None)') || (hpSkillTarget && hpSkillTarget.length > 0)) {
    const glbBuffObj = {
      typing: (elementforHPRelated === '(None)') ? 'All' : (elementforHPRelated || 'All'),
      value: 0,
      target: 'All'
    }
    if (hpSkillTarget === '7') {
      // targets party
      glbBuffObj.target = 'All'
    } else if (hpSkillTarget === '0') {
      // targets self
      glbBuffObj.target = char.id
    }
		if (hpAboveOrBelow === '0') {
			if ((char.hp / char.maxHp) >= Number(hpRequirement_2)){
        glbBuffObj.value = Number(hpAttackAdd_2)
        return glbBuffObj
			}
		} else if (hpAboveOrBelow === '1') {
			if ((char.hp / char.maxHp) <= Number(hpRequirement_2) ){
				glbBuffObj.value = Number(hpAttackAdd_2)
        return glbBuffObj
			}
		}
    else if (hpAboveOrBelow === '30') {
			if (char.isPierce){
				glbBuffObj.value = Number(hpAttackAdd_2)
        return glbBuffObj
			}
		}
    else if (hpAboveOrBelow === '31') {
			if (char.isLevitate){
				glbBuffObj.value = Number(hpAttackAdd_2)
        return glbBuffObj
			}
		}
	}
}


function calcBuffs(main, sub) {
  // get char stats
	// parse leader skills
	if (skillTypes[leaderAbilityMappings[main.id].skillType]) {
    const buffInfo = leaderSkillCheck(main)
    // add leader buff to buff list
    globalBuffs.push({
      ...buffInfo,
      skillType: skillTypes[leaderAbilityMappings[main.id].skillType]
    })
	}
	// parse main unit abilities (3)
	for (let i = 1; i < 4; i += 1) {
		const data = abilitiesMappings[`${leaderAbilityMappings[main.id].name}_${i}`]
    const isSecond = (data.nameSecond && data.nameSecond.length > 0)
		if (skillTypes[data.skillType]) {
      // regular skills
      const buffInfo = skillCheck(main, data, i)
      if (buffInfo && buffInfo.value) {
        globalBuffs.push({
          ...buffInfo,
          skillType: skillTypes[data.skillType]
        })
      }
      if (isSecond) {
        const buffInfo2 = skillCheck(main, data, i, isSecond)
        if (buffInfo2 && buffInfo2.value) {
          globalBuffs.push({
            ...buffInfo2,
            skillType: skillTypes[data.skillTypeSecond]
          })
        }
      }
		}
		if (hpSkillTargetTypes[data.hpSkillTarget] !== null || (hpSkillTargetTypes[data.hpSkillTargetSecond] !== null)) {
      // hp related skills
      const buffInfo = healthCheck(main, data, i)
      if (buffInfo && buffInfo.value) {
        globalBuffs.push({
          ...buffInfo,
          skillType: 'Attack_Percent_Modifier'
        })
      }
      if (isSecond) {
        const buffInfo2 = healthCheck(main, data, i, isSecond)
        if (buffInfo2 && buffInfo2.value) {
          globalBuffs.push({
            ...buffInfo2,
            skillType: 'Attack_Percent_Modifier'
          })
        }
      }
		}
	}
  // parse sub unit abilities (2)
	for (let i = 1; i < 3; i += 1) {
		const data = abilitiesMappings[`${leaderAbilityMappings[sub.id].name}_${i}`]
    const isSecond = (data.nameSecond && data.nameSecond.length > 0)
		if (skillTypes[data.skillType] ) {
      // regular skills
      const buffInfo = skillCheck(sub, data, i)
      if (buffInfo && buffInfo.value) {
        globalBuffs.push({
          ...buffInfo,
          skillType: skillTypes[data.skillType]
        })
      }
      if (isSecond) {
        const buffInfo2 = skillCheck(sub, data, i, isSecond)
        if (buffInfo2 && buffInfo2.value) {
          globalBuffs.push({
            ...buffInfo2,
            skillType: skillTypes[data.skillTypeSecond]
          })
        }
      }
		}
		if (hpSkillTargetTypes[data.hpSkillTarget] !== null || (hpSkillTargetTypes[data.hpSkillTargetSecond] !== null)) {
      // hp related skills
      const buffInfo = healthCheck(sub, data, i)
      if (buffInfo && buffInfo.value) {
        globalBuffs.push({
          ...buffInfo,
          skillType: 'Attack_Percent_Modifier'
        })
      }
      if (isSecond) {
        const buffInfo2 = healthCheck(sub, data, i, isSecond)
        if (buffInfo2 && buffInfo2.value) {
          globalBuffs.push({
            ...buffInfo2,
            skillType: 'Attack_Percent_Modifier'
          })
        }
      }
		}
	}
}

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

	// loop through each character and calculate buffs
  globalBuffs.forEach((buff, index) => {
    // satisfies typing check
    if (buff.typing === 'All' || buff.typing === main.type) {
      // satifies the correct target
      if (buff.target === 'All' || buff.target === main.id) {
        dynamicInfo[buff.skillType] += buff.value
      }
    }
  })

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
	calcBuffs(unit, subTeam[index])
})

console.log(globalBuffs)

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