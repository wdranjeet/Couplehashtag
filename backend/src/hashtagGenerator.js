/**
 * Core Hashtag Generation Logic
 * Generates creative couple hashtags from two names
 */

class HashtagGenerator {
  constructor() {
    this.modifiers = [
      'Love', 'Forever', 'Together', 'CoupleGoals', 'Couple',
      'Wedding', 'Married', 'Hearts', 'Romance', 'Soulmates',
      'BetterTogether', 'TrueLove', 'MyLove', 'ForeverLove'
    ];
  }

  /**
   * Clean and capitalize name
   */
  cleanName(name) {
    if (!name) return '';
    return name.trim().charAt(0).toUpperCase() + name.trim().slice(1).toLowerCase();
  }

  /**
   * Get first N characters of a name
   */
  getFirst(name, count = 3) {
    return name.substring(0, Math.min(count, name.length));
  }

  /**
   * Get last N characters of a name
   */
  getLast(name, count = 3) {
    return name.substring(Math.max(0, name.length - count));
  }

  /**
   * Generate simple concatenation variations
   */
  generateConcatenations(name1, name2) {
    const hashtags = [];
    
    // Full name combinations
    hashtags.push(`#${name1}${name2}`);
    hashtags.push(`#${name2}${name1}`);
    hashtags.push(`#${name1}And${name2}`);
    hashtags.push(`#${name1}x${name2}`);
    hashtags.push(`#${name2}x${name1}`);
    
    // Partial combinations
    const first1 = this.getFirst(name1, 3);
    const first2 = this.getFirst(name2, 3);
    const last1 = this.getLast(name1, 3);
    const last2 = this.getLast(name2, 3);
    
    hashtags.push(`#${first1}${last2}`);
    hashtags.push(`#${first2}${last1}`);
    hashtags.push(`#${first1}${first2}`);
    
    // Different length combinations
    hashtags.push(`#${this.getFirst(name1, 4)}${this.getLast(name2, 4)}`);
    hashtags.push(`#${this.getFirst(name2, 4)}${this.getLast(name1, 4)}`);
    
    return hashtags;
  }

  /**
   * Generate hashtags with creative modifiers
   */
  generateWithModifiers(name1, name2) {
    const hashtags = [];
    const combinations = [
      `${name1}${name2}`,
      `${name2}${name1}`,
      `${this.getFirst(name1, 3)}${this.getLast(name2, 3)}`,
      `${this.getFirst(name2, 3)}${this.getLast(name1, 3)}`
    ];
    
    // Add modifiers to combinations
    combinations.forEach(combo => {
      this.modifiers.slice(0, 5).forEach(modifier => {
        hashtags.push(`#${combo}${modifier}`);
      });
    });
    
    // Add names with modifiers separately
    this.modifiers.forEach(modifier => {
      hashtags.push(`#${name1}${modifier}`);
      hashtags.push(`#${name2}${modifier}`);
    });
    
    return hashtags;
  }

  /**
   * Generate all hashtag variations
   */
  generateHashtags(name1Input, name2Input) {
    const name1 = this.cleanName(name1Input);
    const name2 = this.cleanName(name2Input);
    
    if (!name1 || !name2) {
      return {
        success: false,
        error: 'Both names are required',
        hashtags: []
      };
    }
    
    const allHashtags = new Set();
    
    // Generate different types of hashtags
    const concatenations = this.generateConcatenations(name1, name2);
    const withModifiers = this.generateWithModifiers(name1, name2);
    
    // Combine all and remove duplicates
    [...concatenations, ...withModifiers].forEach(tag => {
      allHashtags.add(tag);
    });
    
    // Convert to array and limit to top suggestions
    const hashtags = Array.from(allHashtags).slice(0, 30);
    
    return {
      success: true,
      hashtags: hashtags,
      count: hashtags.length
    };
  }
}

module.exports = new HashtagGenerator();
