

function calcUnitDmg() {
	const Skill_Base_Damage = 100
	const Unit_Attack = 731
	const Attack_Percent_Modifier = 0
	const Skill_Attack_Multiplier = 1
	const isWeak = false
  const comboCount = 0
	const coffinCount = 0
	const buffCount = 0
	const rangeBonus = 0
	const statModifierDirectAttackDamage = 0
	const totalDirectAttackConditionSlayer = 0
	const isPowerFlip = false
	const powerFlipLevel = 0
	const statModifierPowerFlipDamage = 0
	const statModifierPowerFlipLvDamage = 0
	const statModifierSkillDamage = 0
	const isBreak = false
	const statModifierBreak = 0
	const totalEnemyResist = 0
	const Total_Resist = 0
	// get char stats
	return (Skill_Base_Damage + (Unit_Attack * (1 + Attack_Percent_Modifier)) * Skill_Attack_Multiplier) // base dmg
	 * (isWeak ? 1.5 : 1) // elemental advantage
	 * ((comboCount !== 0) ? (1 + comboCount) : 1)
	 * ((coffinCount !== 0) ? (1 + coffinCount) : 1)
	 * ((buffCount !== 0) ? (1 + buffCount) : 1)
	 * ((isPowerFlip && statModifierPowerFlipDamage !== 0) ? (1 + statModifierPowerFlipDamage) : 1)
	 * ((isPowerFlip && (powerFlipLevel > 0) && statModifierPowerFlipLvDamage !== 0) ? (1 + statModifierPowerFlipLvDamage) : 1)
	 * ((statModifierSkillDamage !== 0) ? (1 + statModifierSkillDamage) : 1)
	 * ((isBreak) ? (1 + statModifierBreak) : 1)
	 * ((totalEnemyResist !== 0) ? (1 - totalEnemyResist) : 1)
	 * (Total_Resist > 0) ? (1 / (1 + Total_Resist)) : (1 - Total_Resist)
}

console.log(calcUnitDmg())

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