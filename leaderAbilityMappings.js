import leaderAbilities from "./leaderAbility"

export const skillTypes = {
  "31": "Attack_Percent_Modifier", // + XX% to Attack Damage
  "33": "statModifierSkillDamage", // + XXX% to Skill Damage
  "95": "Total_Resist", // not sure
  "203": "HP_Modifier"
}

const parseLeaderAbilities = () => {
  const parsedData = []
  for (let key in leaderAbilities) {
    const seperatedData = leaderAbilities[key
    ].split(',')
    parsedData.push({
      id: key,
      name: seperatedData[
        0
      ],
      // Primary Leader Effects
      targetElement: seperatedData[27],
      everyXCombo_1: seperatedData[11], // the combo count needed to trigger leader skill
      everyXCombo_2: seperatedData[12],
      comboCap: seperatedData[13], // max # of X-combos needed to cap leader skill
      elementInParty: seperatedData[14],
      skillType: seperatedData[15], // a mapping to determine the modifier of the leader skill
      targetAllUnitElement: seperatedData[17], // the element being modified
      skillValue_1: seperatedData[18],
      skillValue_2: seperatedData[19],
      hPAbove_1: seperatedData[28],
      hPAbove_2: seperatedData[29],
      hpBelow_1: seperatedData[30],
      hpBelow_2: seperatedData[31],
      attackAdd_1: seperatedData[34], // + XX% to Attack Damage
      attackAdd_2: seperatedData[35],
      attackMulti_1: seperatedData[36],
      attackMulti_2: seperatedData[37],
      // Secondary Leader Effects
      everyXComboSecond_1: seperatedData[51], // the combo needed to trigger leader skill
      everyXComboSecond_2: seperatedData[52],
      comboCapSecond: seperatedData[53], // max # of X-combos needed to cap leader skill
      skillTypeSecond: seperatedData[55], // a mapping to determine the modifier of the leader skill
      targetAllUnitElementSecond: seperatedData[57], // the element being modified
      skillValueSecond_1: seperatedData[58],
      skillValueSecond_2: seperatedData[59],
    })
  }
  return parsedData
}

export default parseLeaderAbilities()