import path from 'path';
import fs from 'fs';

const settings = {
  "minecraft_version": "1.21.4", 
  "host": "162.55.100.208", 
  "port": 25536,
  "auth": "offline", 

  // CHANGED FOR RENDER: Render Background Workers cannot host accessible UI ports.
  // If you need the Mindserver UI dashboard, you must deploy as a Render "Web Service" instead.
  "host_mindserver": false, 
  "mindserver_host": "localhost",
  "mindserver_port": 8080,

  "base_profile": "./profiles/defaults/_default.json", 
  "profiles": [
    "./andy.json",
  ],
  "plugins": [], 
  "load_memory": false, 
  "init_message": "Respond with hello world and your name", 
  "only_chat_with": [], 

  "language": "en", 
  "show_bot_views": false, // Keep false (Render has no display screen)

  "allow_insecure_coding": false, 
  "allow_vision": false, 
  "vision_mode": "prompted", 
  "blocked_actions": ["!checkBlueprint", "!checkBlueprintLevel", "!getBlueprint", "!getBlueprintLevel"], 
  "code_timeout_mins": -1, 
  "relevant_docs_count": 5, 

  "max_messages": 15, 
  "num_examples": 2, 
  "max_commands": -1, 
  "verbose_commands": true, 
  "narrate_behavior": true, 
  "chat_bot_messages": true, 

  "auto_idle_trigger": {
    "enabled": false,
    "timeout_secs": 120, 
    "message": "Keep doing stuff!"
  },

  // CRITICAL CHANGE FOR RENDER: Turn this FALSE. 
  // Render's Linux environment does not have "espeak" installed. Leaving this true will crash the bot.
  "speak": false, 

  "stt_transcription": false, 
  "stt_provider": "pollinations", 
  "stt_username": "SERVER", 
  "stt_agent_name": "", 

  "stt_rms_threshold": 3000,       
  "stt_silence_duration": 2000,   
  "stt_min_audio_duration": 0.5,  
  "stt_max_audio_duration": 45,   
  "stt_debug_audio": true,        
  "stt_cooldown_ms": 2000,        
  "stt_speech_threshold_ratio": 0.05, 
  "stt_consecutive_speech_samples": 3, 

  "log_normal_data": false, 
  "log_reasoning_data": false, 
  "log_vision_data": false, 
}

// Environment variable overrides engine (Leave this intact)
if (process.env.SETTINGS_PATH) {
  try {
    const cfgPath = path.resolve(process.env.SETTINGS_PATH);
    if (fs.existsSync(cfgPath)) {
      const raw = fs.readFileSync(cfgPath, 'utf-8');
      const overrides = JSON.parse(raw);
      Object.assign(settings, overrides);
      console.log(`Loaded overrides from ${cfgPath}`);
    } else {
      console.warn(`SETTINGS_PATH file not found: ${cfgPath}`);
    }
  } catch (err) {
    console.error("Failed to load SETTINGS_PATH overrides:", err);
  }
}
if (process.env.MINECRAFT_VERSION) {
  settings.minecraft_version = process.env.MINECRAFT_VERSION;
}
if (process.env.HOST) {
  settings.host = process.env.HOST;
}
if (process.env.PORT) {
  settings.port = parseInt(process.env.PORT, 10);
}
if (process.env.MINECRAFT_PORT) {
  settings.port = parseInt(process.env.MINECRAFT_PORT, 10);
}
if (process.env.AUTH) {
  settings.auth = process.env.AUTH;
}
if (process.env.MINDSERVER_PORT) {
  settings.mindserver_port = parseInt(process.env.MINDSERVER_PORT, 10);
}
if (process.env.PROFILES) {
  try {
    const profiles = JSON.parse(process.env.PROFILES);
    if (Array.isArray(profiles) && profiles.length > 0) {
      settings.profiles = profiles;
    }
  } catch (e) {
    console.error("Failed to parse PROFILES env var:", e);
  }
}
if (process.env.LOAD_MEMORY) {
  settings.load_memory = JSON.parse(process.env.LOAD_MEMORY);
}
if (process.env.ONLY_CHAT_WITH) {
  try {
    settings.only_chat_with = JSON.parse(process.env.ONLY_CHAT_WITH);
  } catch (e) {
    console.error("Failed to parse ONLY_CHAT_WITH env var:", e);
  }
}
if (process.env.LANGUAGE) {
  settings.language = process.env.LANGUAGE;
}
if (process.env.SHOW_BOT_VIEWS) {
  settings.show_bot_views = JSON.parse(process.env.SHOW_BOT_VIEWS);
}
if (process.env.ALLOW_INSECURE_CODING || process.env.INSECURE_CODING) {
  settings.allow_insecure_coding = true;
}
if (process.env.ALLOW_VISION) {
  settings.allow_vision = JSON.parse(process.env.ALLOW_VISION);
}
if (process.env.VISION_MODE) {
  settings.vision_mode = process.env.VISION_MODE;
}
if (process.env.BLOCKED_ACTIONS) {
  try {
    settings.blocked_actions = JSON.parse(process.env.BLOCKED_ACTIONS);
  } catch (e) {
    console.error("Failed to parse BLOCKED_ACTIONS env var:", e);
  }
}
if (process.env.MAX_MESSAGES) {
  settings.max_messages = parseInt(process.env.MAX_MESSAGES, 10);
}
if (process.env.NUM_EXAMPLES) {
  settings.num_examples = parseInt(process.env.NUM_EXAMPLES, 10);
}

export default settings;
