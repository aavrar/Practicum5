import { NextResponse } from 'next/server';
import { UserTensor } from '@/types';

// Mock database of "Universal" scene templates
const SCENE_TEMPLATES = [
    {
        id: 'waiting_room',
        text: "The fluorescent lights hummed with a sound that felt like [SENSORY_DETAIL]. You looked at your hands, tracing the lines that reminded you of [FAMILY_MEMBER]. The clock on the wall didn't just mark time; it measured the distance between who you were and who you needed to be."
    },
    {
        id: 'late_night',
        text: "It was [TIME], and the city outside was a quiet beast. You sat with the blank page, the cursor blinking like a heartbeat. In the silence, you could almost hear [CULTURAL_SOUND], a ghost frequency cutting through the static."
    }
];

// Mock database of "Cultural Specificity" injections
const CULTURAL_INJECTIONS = {
    'Sindh, Pakistan': {
        sensory: ["the dust of interior Sindh", "the smell of cardamom and stale tea"],
        family: ["Abbu", "Dadi"],
        sound: ["a distant qawwali", "the call to prayer distorted by distance"]
    },
    'USA': {
        sensory: ["sterile hospital air", "the ozone smell of a departure gate"],
        family: ["Dad", "Grandma"],
        sound: ["police sirens", "the hum of the refrigerator"]
    }
};

// Mock database of "Code-Switching" phrases (Urdu/English)
const CODE_SWITCHES = [
    { trigger: "grief", phrase: "dil ghabra raha hai" }, // heart is restless
    { trigger: "silence", phrase: "khamoshi" },
    { trigger: "destiny", phrase: "kismat" },
    { trigger: "patience", phrase: "sabr" }
];

export async function POST(request: Request) {
    try {
        const { tensor, premise }: { tensor: UserTensor; premise: any } = await request.json();

        // 1. Select Template based on Premise Context (Random for mock)
        const template = SCENE_TEMPLATES[Math.floor(Math.random() * SCENE_TEMPLATES.length)];
        let sceneText = template.text;

        // 2. Identify Cultural Context
        // In a real system, this would be weighted. Here we pick the primary heritage.
        const primaryHeritage = (tensor.cultural_coordinates.heritage[0] as any).region || 'USA';
        const injections = CULTURAL_INJECTIONS[primaryHeritage as keyof typeof CULTURAL_INJECTIONS] || CULTURAL_INJECTIONS['USA'];

        // 3. Inject Cultural Specificity (The "Flesh")
        sceneText = sceneText.replace('[SENSORY_DETAIL]', injections.sensory[Math.floor(Math.random() * injections.sensory.length)]);
        sceneText = sceneText.replace('[FAMILY_MEMBER]', injections.family[Math.floor(Math.random() * injections.family.length)]);
        sceneText = sceneText.replace('[CULTURAL_SOUND]', injections.sound[Math.floor(Math.random() * injections.sound.length)]);
        sceneText = sceneText.replace('[TIME]', tensor.contextual_signals.local_time);

        // 4. Apply Code-Switching (The "Nuance")
        // Randomly inject a code-switch if the "frequency" is High
        if (tensor.cultural_coordinates.linguistics.code_switching_patterns.frequency === 'High') {
            const switchPhrase = CODE_SWITCHES[Math.floor(Math.random() * CODE_SWITCHES.length)];
            sceneText += ` It was a moment of ${switchPhrase.phrase}—${switchPhrase.trigger} that couldn't be translated, only felt.`;
        }

        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        return NextResponse.json({
            scene: sceneText,
            annotations: [
                { type: 'cultural', note: `Injected sensory details from ${primaryHeritage}` },
                { type: 'linguistic', note: `Applied code-switching based on ${tensor.cultural_coordinates.linguistics.secondary} fluency` }
            ]
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to generate scene' }, { status: 500 });
    }
}
